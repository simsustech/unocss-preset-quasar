---
layout: doc
---

# Per-Component Impact Table

Detailed breakdown for all 23 SASS files with pseudo-elements.

| Component       | SASS File                              | `&:before` | `&:after` | Pattern Type                                      | Preset Refactor Effort | Native Swap Feasibility |
| --------------- | -------------------------------------- | ---------- | --------- | ------------------------------------------------- | ---------------------- | ----------------------- |
| QField          | `field/QField.sass`                    | 6          | 6         | Hover surface + animated focus underline          | Low                    | Medium                  |
| QDate           | `date/QDate.sass`                      | 5          | 6         | Calendar cell border, range highlight, edit range | Medium                 | Low                     |
| QSlider         | `slider/QSlider.sass`                  | 5          | 5         | Track bar, thumb halo, focus ring                 | Low                    | High                    |
| QBtn            | `btn/QBtn.sass`                        | 4          | 4         | Box-shadow behind, outline border, push 3D, flat  | Medium                 | Low                     |
| QTree           | `tree/QTree.sass`                      | 3          | 3         | Vertical connector line                           | Low                    | Low                     |
| QLayout         | `layout/QLayout.sass`                  | 2          | 3         | Drawer backdrop, header/footer shadows            | Low                    | Medium                  |
| QTimeline       | `timeline/QTimeline.sass`              | 3          | 3         | Connector lines, dot halos                        | Low                    | Low                     |
| QStepper        | `stepper/QStepper.sass`                | 3          | 2         | Step connector, active indicator                  | Low                    | Low                     |
| QTable          | `table/QTable.sass`                    | 2          | 3         | Row hover, selection, sort indicator              | Low                    | Low                     |
| QToggle         | `toggle/QToggle.sass`                  | 2          | 2         | Thumb halo, checked background                    | Low                    | High                    |
| QTime           | `time/QTime.sass`                      | 2          | 2         | Clock hand, period indicator                      | Low                    | Medium                  |
| QLinearProgress | `linear-progress/QLinearProgress.sass` | 1          | 2         | Track, indeterminate, buffer                      | Low                    | High                    |
| QUploader       | `uploader/QUploader.sass`              | 1          | 1         | Drop zone overlay                                 | Low                    | Low                     |
| QSkeleton       | `skeleton/QSkeleton.sass`              | 1          | 1         | Shimmer sweep                                     | Low                    | None                    |
| QChatMessage    | `chat/QChatMessage.sass`               | 1          | 2         | Bubble tail, status                               | Low                    | None                    |
| QColor          | `color/QColor.sass`                    | 1          | 1         | Spectrum overlay                                  | Low                    | None                    |
| QEditor         | `editor/QEditor.sass`                  | 0          | 1         | Toolbar divider                                   | Trivial                | None                    |
| QKnob           | `knob/QKnob.sass`                      | 1          | 0         | Focus ring                                        | Done                   | High                    |
| QBtnGroup       | `btn-group/QBtnGroup.sass`             | 0          | 1         | Divider between buttons                           | Trivial                | None                    |
| QRadio          | `radio/QRadio.sass`                    | 0          | 1         | Inner dot                                         | Trivial                | High                    |
| QIcon           | `icon/QIcon.sass`                      | 0          | 1         | Font fallback                                     | Trivial                | None                    |
| QCheckbox       | `checkbox/QCheckbox.sass`              | 0          | 1         | Checkmark animation                               | Trivial                | High                    |
| Visibility      | `core/visibility.sass`                 | 4          | 4         | Screen-reader utilities                           | None                   | N/A                     |
| Normalize       | `core/normalize.sass`                  | 0          | 1         | Print reset                                       | None                   | N/A                     |

## Summary by Effort

| Effort Level | Components                                                                                                                        | Count |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------- | ----- |
| Trivial      | QEditor, QKnob, QBtnGroup, QRadio, QIcon, QCheckbox                                                                               | 6     |
| Low          | QSlider, QTree, QLayout, QTimeline, QStepper, QTable, QToggle, QTime, QLinearProgress, QUploader, QSkeleton, QChatMessage, QColor | 13    |
| Medium       | QDate, QBtn                                                                                                                       | 2     |
| High         | QField                                                                                                                            | 1     |
| None         | Visibility, Normalize                                                                                                             | 2     |

## Summary by Native Swap Feasibility

| Feasibility | Components                                                                                  | Count |
| ----------- | ------------------------------------------------------------------------------------------- | ----- |
| High        | QSlider, QToggle, QLinearProgress, QKnob, QRadio, QCheckbox                                 | 6     |
| Medium      | QField, QTime, QLayout                                                                      | 3     |
| Low         | QDate, QBtn, QTree, QTimeline, QStepper, QTable, QUploader, QSkeleton, QChatMessage, QColor | 10    |
| None        | QSkeleton, QChatMessage, QColor, QEditor, QBtnGroup, QIcon, Visibility, Normalize           | 8     |
| N/A         | Visibility, Normalize                                                                       | 2     |
