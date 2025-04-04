---
title: Uploader
desc: The QUploader Vue component is a way for the user to upload files to a backend server.
keys: QUploader
examples: QUploader
related:
  - /vue-components/file
---

Quasar supplies a way for you to upload files through the QUploader component.

::: tip
If all you want is an input file, you might want to consider using [QFile](/vue-components/file) picker component instead.
:::

<DocApi file="QUploader" />

## Usage

::: warning
QUploader requires a back-end server to receive the files. The examples below will not actually upload.
:::

::: tip
QUploader is `drag and drop` compliant.
:::

::: warning
When using vee-validate, you have to rename the "fieldBagName" configuration of vee-validate for the q-uploader to work.
:::

### Design

<DocExample title="Basic" file="Basic" />

<DocExample title="Force dark mode" file="Dark" />

### Uploading multiple files

By default, multiple files will be uploaded individually (one thread per file). Should you want all files to be uploaded in a single thread, use the `batch` property (second QUploader in the example below).

<DocExample title="Multiple" file="Multiple" />

### Restricting upload

<DocExample title="Basic restrictions" file="RestrictionBasic" />

::: tip
In the example above, we're using `accept` property. Its value must be a comma separated list of unique file type specifiers. Maps to 'accept' attribute of native input type=file element. [More info](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Unique_file_type_specifiers).
:::

::: warning
Recommended format for the `accept` property is `<mediatype>/<extension>`. Examples: "image/jpeg", "image/png". QUploader uses an `<input type="file">` under the hood and it relies entirely on the host browser to trigger the file picker. If the `accept` property (that gets applied to the input) is not correct, no file picker will appear on screen or it will appear but it will accept all file types.
:::

You can also apply custom filters (which are executed after user picks files):

<DocExample title="Filter" file="RestrictionFilter" />

### Adding headers

Use `headers` for setting additional XHR headers to be sent along the upload request. Also check `form-fields` prop in the API, if you need additional fields to be embedded.

<DocExample title="Headers" file="Headers" />

::: tip
These two props (`headers` and `form-fields`) can be used as a function too (`(files) => Array`), allowing you to dynamically set them based on the files that are to be uploaded.
:::

There is also the `with-credentials` property, which sets `withCredentials` to `true` on the XHR used by the upload process.

### Handling upload

<DocExample title="Auto upload on file selection" file="UploadAuto" />

<DocExample title="Custom upload URL" file="UploadURL" />

::: tip
You can also customize the HTTP headers and HTTP method through `headers` and `method` props. Check QUploader API section.
:::

### Factory function

There is a `factory` prop you can use which must be a Function. This function can return either an Object or a Promise resolving with an Object (and in case the Promise fails, `@factory-failed` event is emitted).

The Object described above can override the following QUploader props: `url`, `method`, `headers`, `formFields`, `fieldName`, `withCredentials`, `sendRaw`). The props of this Object can be Functions as well (of form `(file[s]) => value`):

<DocExample title="Promise-based factory function" file="FactoryPromise" />

You can also use the `factory` Function prop and return immediately the same Object. This is useful if you want to set multiple props (described above) simultaneously:

<DocExample title="Immediate return factory function" file="FactoryImmediate" />

### Slots

In the example below we're showing the equivalent of the default header. Also notice some Boolean scope properties that you can use: `scope.canAddFiles`, `scope.canUpload`, `scope.isUploading`.

::: warning
Notice that you must install and use one more component (QUploaderAddTrigger) in order to be able to add files to the queue. This component needs to be placed under a DOM node which has `position: relative` (hint: QBtn has it already) and will automatically inject the necessary events when user clicks on its parent (do NOT manually add `@click="scope.pickFiles"`). If the trigger is not working, check if you have an element rendered above it and change the zIndex of QUploaderAddTrigger accordingly.
:::

<DocExample title="Custom header" file="SlotHeader" />

<DocExample title="Custom files list" file="SlotList" />

## Server endpoint examples

QUploader works by default with the HTTP(S) protocol to upload files (but it's not limited to it as you'll see in the section following this one).

::: tip
It is by no means required to use a Nodejs server or Spring or ASP.NET like below -- you can handle file upload however you want, as long as the method you are using fits the HTTP protocol. Example with [PHP](https://secure.php.net/manual/en/features.file-upload.php).
:::

### Nodejs

Below is a basic server example written in Nodejs. It does nothing other than receiving the files, so consider it as a starting point.

```js
import fs from 'node:fs'
import path from 'node:path'
import express from 'express'
import formidable from 'formidable'
import throttle from 'express-throttle-bandwidth'

const app = express()

const port = process.env.PORT || 4444
const folder = fileURLToPath(new URL('./files', import.meta.url))

if (!fs.existsSync(folder)) {
  fs.mkdirSync(folder)
}

app.set('port', port)
app.use(throttle(1024 * 128)) // throttling bandwidth

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

app.post('/upload', (req, res) => {
  const form = new formidable.IncomingForm()

  form.uploadDir = folder
  form.parse(req, (_, fields, files) => {
    console.log('\n-----------')
    console.log('Fields', fields)
    console.log('Received:', Object.keys(files))
    console.log()
    res.send('Thank you')
  })
})

app.listen(port, () => {
  console.log('\nUpload server running on http://localhost:' + port)
})
```

### ASP.NET MVC/Core

QUploader seamlessly integrates with a Microsoft ASP.NET MVC/Core 2.x Web API backend.
In your Vue file, configure the QUploader component with the desired Web API endpoint:

```html
<q-uploader
  url="http://localhost:4444/fileuploader/upload"
  label="Upload"
  style="max-width: 300px"
/>
```

If your server requires authentication such as a JWT token, use QUploader's factory function to specify the xhr header that will be used by QUploader. For example:

```html
<template>
  <q-uploader label="Upload" :factory="factoryFn" style="max-width: 300px" />
</template>

<script>
  export default {
    methods: {
      factoryFn(file) {
        return new Promise((resolve, reject) => {
          // Retrieve JWT token from your store.
          const token = 'myToken'
          resolve({
            url: 'http://localhost:4444/fileuploader/upload',
            method: 'POST',
            headers: [{ name: 'Authorization', value: `Bearer ${token}` }]
          })
        })
      }
    }
  }
</script>
```

The file(s) payload of QUploader will be a properly formed `IFormFileCollection` object that you can read via your ASP.NET Web API controller's `.Request` property.
ASP.NET Core 2.2 Controller:

```
[Route("api/[controller]")]
[ApiController]
public class FileUploaderController : ControllerBase
{
    [HttpPost]
    public async Task upload()
    {
        // Request's .Form.Files property will
        // contain QUploader's files.
        var files = this.Request.Form.Files;
        foreach (var file in files)
        {
            if (file == null || file.Length == 0)
                continue;

            // Do something with the file.
            var fileName = file.FileName;
            var fileSize = file.Length;
            // save to server...
            // ...
        }
    }
}
```

### Spring

Below is a [Spring](https://spring.io/guides/gs/uploading-files/) example. Attribute `fieldName="file"` is mapping with `@RequestPart(value = "file")`.

```
// java
@RestController
public class UploadRest {
	@PostMapping("/upload")
	public void handleFileUpload(@RequestPart(value = "file") final MultipartFile uploadfile) throws IOException {
		saveUploadedFiles(uploadfile);
	}

	private String saveUploadedFiles(final MultipartFile file) throws IOException {
		final byte[] bytes = file.getBytes();
		final Path path = Paths.get("YOUR_ABSOLUTE_PATH" + file.getOriginalFilename());
		Files.write(path, bytes);
	}
}

// html
<q-uploader field-name="file" url="YOUR_URL_BACK/upload" with-credentials />
```

### Python/Flask

```
// python
from flask import Flask, request
from werkzeug import secure_filename
from flask_cors import CORS
import os

app = Flask(__name__)

# This is necessary because QUploader uses an AJAX request
# to send the file
cors = CORS()
cors.init_app(app, resource={r"/api/*": {"origins": "*"}})

@app.route('/upload', methods=['POST'])
def upload():
    for fname in request.files:
        f = request.files.get(fname)
        print(f)
        f.save('./uploads/%s' % secure_filename(fname))

    return 'Okay!'

if __name__ == '__main__':
    if not os.path.exists('./uploads'):
        os.mkdir('./uploads')
    app.run(debug=True)
```

### Julia/Genie

```
# Julia Genie

using Genie, Genie.Requests, Genie.Renderer

Genie.config.cors_headers["Access-Control-Allow-Origin"]  =  "*"
Genie.config.cors_headers["Access-Control-Allow-Headers"] = "Content-Type"
Genie.config.cors_headers["Access-Control-Allow-Methods"] = "GET,POST,PUT,DELETE,OPTIONS"
Genie.config.cors_allowed_origins = ["*"]

#== server ==#

route("/") do
  "File Upload"
end

route("/upload", method = POST) do
  if infilespayload(:img)                 # :img is file-name
    @info filename(filespayload(:img))    # file-name="img"
    @info filespayload(:img).data

    open("upload/file.jpg", "w") do io
      write(io, filespayload(:img).data)
    end
  else
    @info "No image uploaded"
  end

  Genie.Renderer.redirect(:get)
end

isrunning(:webserver) || up()
```

### Perl/Mojolicious

```
# Perl

use Mojolicious::Lite -signatures;

# CORS
app->hook(after_dispatch => sub {
    my $c = shift;
    $c->res->headers->header('Access-Control-Allow-Origin' => '*');
});
options '*' => sub ($c) {
   $c->res->headers->header('Access-Control-Allow-Methods' => 'GET, OPTIONS, POST, DELETE, PUT');
   $c->res->headers->header('Access-Control-Allow-Headers' => 'Content-Type');
   $c->render(text => '');
};

post '/upload' => sub ($c) {
   my $uploads = $c->req->uploads('files');

   foreach my $f (@{$uploads}) {
      $f->move_to('/tmp/' . $f->filename);
   }

   $c->render(text => 'Saved!');
};

app->start;
```

## Supporting other services

QUploader currently supports uploading through the HTTP(S) protocol. But you can extend the component to support other services as well. Like Firebase for example. Here's how you can do it.

::: warning Help appreciated
We'd be more than happy to accept PRs on supporting other upload services as well, so others can benefit. Hit the `Edit this page in browser` link at bottom of this page or the pencil icon at the top of the page.
:::

Below is an example with the API that you need to supply to the `createUploaderComponent()` Quasar util. This will create a Vue component that you can import in your app.

```js MyUploader.js
import { createUploaderComponent } from 'quasar'
import { computed } from 'vue'

// export a Vue component
export default createUploaderComponent({
  // defining the QUploader plugin here

  name: 'MyUploader', // your component's name

  props: {
    // ...your custom props
  },

  emits: [
    // ...your custom events name list
  ],

  injectPlugin({ props, emit, helpers }) {
    // can call any other composables here
    // as this function will run in the component's setup()

    // [ REQUIRED! ]
    // We're working on uploading files
    const isUploading = computed(() => {
      // return <Boolean>
    })

    // [ optional ]
    // Shows overlay on top of the
    // uploader signaling it's waiting
    // on something (blocks all controls)
    const isBusy = computed(() => {
      // return <Boolean>
    })

    // [ REQUIRED! ]
    // Abort and clean up any process
    // that is in progress
    function abort() {
      // ...
    }

    // [ REQUIRED! ]
    // Start the uploading process
    function upload() {
      // ...
    }

    return {
      isUploading,
      isBusy,

      abort,
      upload
    }
  }
})
```

::: tip TIPS

- For the default XHR implementation in the form of such a plugin, check out [source code](https://github.com/quasarframework/quasar/blob/dev/ui/src/components/uploader/xhr-uploader-plugin.js).
- For the UMD version use `Quasar.createUploaderComponent({ ... })`.
  :::

Then you register this component globally with Vue or you import it and add it to the "components: {}" in your Vue components.

```js
// globally registering your component in a boot file
import MyUploader from '../../path/to/MyUploader' // the file from above

export default ({ app }) {
  app.component('MyUploader', MyUploader)
}

// or declaring it in a .vue file
import MyUploader from '../../path/to/MyUploader' // the file from above
export default {
  // ...
  components: {
    // ...
    MyUploader
  }
}
```

If you're using TypeScript, you'd need to register the new component types to allow Volar to autocomplete props and slots for you.

```js
import {
  GlobalComponentConstructor,
  QUploaderProps,
  QUploaderSlots,
} from 'quasar';

interface MyUploaderProps extends QUploaderProps {
  // .. add custom props
  freeze: boolean;
  // .. add custom events
  onFreeze: boolean;
}

declare module 'vue' {
  interface GlobalComponents {
    MyUploader: GlobalComponentConstructor<MyUploaderProps, QUploaderSlots>;
  }
}
```
