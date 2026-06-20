"""Wrap all CSS template literal fallback strings with qe() where they contain __.
Handles both componentClass and staticClass patterns."""
import re, sys

with open(sys.argv[1], 'r') as f:
    content = f.read()

# Strategy: find all backtick strings and wrap them with qe() if they contain __
# We need to be careful to skip the preflights' CSS and only target shortcut fallbacks

# Convert to lines for processing
lines = content.split('\n')
result = []
i = 0

while i < len(lines):
    line = lines[i]
    
    # Detect start of a template literal that's a shortcut fallback
    # These are inside componentClass('name', ...) or staticClass(...)
    # The backtick string follows a comma (for componentClass) or immediately (for staticClass)
    
    # Check if this line has a backtick that starts a CSS fallback
    # Pattern: after componentClass('name', or staticClass(
    if re.search(r'(?:componentClass|staticClass)\s*\(.*,\s*`|(?:staticClass)\s*\(`', line) \
       or (re.search(r'componentClass\s*\(', line) and '`' in line and line.strip().startswith('`')):
        # Line has opening backtick
        bt_idx = line.find('`')
        # Find the closing backtick (may be on same or later line)
        css_start = bt_idx + 1
        rest = line[bt_idx:]
        
        if rest.count('`') >= 2:  # single line
            # Extract between backticks
            bt1 = line.index('`')
            bt2 = line.rindex('`')
            css_content = line[bt1+1:bt2]
            if '__' in css_content:
                line = line[:bt1] + 'qe(`' + css_content + '`)' + line[bt2+1:]
            result.append(line)
        else:
            # Multi-line - collect lines until closing backtick
            css_lines = [line]
            closing_found = False
            j = i + 1
            while j < len(lines):
                css_lines.append(lines[j])
                if '`' in lines[j]:
                    closing_found = True
                    break
                j += 1
            
            if closing_found:
                full_css = '\n'.join(css_lines)
                bt1 = full_css.index('`')
                bt2 = full_css.rindex('`')
                css_content = full_css[bt1+1:bt2]
                if '__' in css_content:
                    full_css = full_css[:bt1] + 'qe(`' + full_css[bt1+1:bt2] + '`)' + full_css[bt2+1:]
                result.append(full_css)
                i = j
            else:
                result.append(line)
    else:
        result.append(line)
    
    i += 1

new_content = '\n'.join(result)

old_count = content.count('qe(`')
new_count = new_content.count('qe(`')
old_static = content.count('staticClass(qe(')
new_static = new_content.count('staticClass(qe(')
print(f"qe( calls: {old_count} -> {new_count}")
print(f"staticClass(qe(: {old_static} -> {new_static}")

with open(sys.argv[1], 'w') as f:
    f.write(new_content)
print("Done.")
