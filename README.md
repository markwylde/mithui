# mithui
A ui library for mithril.

[Live demo](https://mithui.onrender.com/)

## Screenshot
<img src="demo/screenshot.png" width="300px" alt="Screenshot of Demo" />

## Available Components
### Dropdown
```javascript
m(mui.dropdown, [
  m('div', 'Item 1'),
  m('div', 'Item 2'),
  m('div', 'Item 3'),
])
```

### Forms
### Text Input
```javascript
m(mui.textInput, {
  name: 'firstName',
  label: 'First Name',
  errors: errors.firstName,
  autoFocus: true,
  initialValue: 'Joe'
})
```
### Multiline Input
```javascript
m(mui.multilineInput, {
  name: 'bio',
  label: 'Profile Bio',
  errors: errors.lastName,
  initialValue: 'Some cool information about me'
})
```

### Select
```javascript
m(mui.select, {
  name: 'location',
  label: 'Location',
  errors: errors.location,
  options: [
    {
      value: 'au',
      label: 'Australia'
    },
    {
      value: 'uk',
      label: 'United Kingdom'
    }
  ],
  initialValue: 'uk'
})
```

### Checkbox
```javascript
m(mui.checkbox, {
  name: 'active',
  label: 'Active',
  errors: errors.active,
  initialValue: true
})
```

### File Picker
```javascript
m(mui.filePicker, {
  name: 'pictures',
  label: 'Profile Pictures',
  errors: errors.picture,
  prefix: '/data/avatars/',
  multiple: true,
  initialValue: [{
    name: 'bbb.txt',
    id: 12
  }]
})
```

## Example Usage
```javascript
const m = require('mithril');
const mui = require('mithui');

m(
  'div',
  { class: 'someForm' },
  m(mui.form,
    m(mui.textInput, {
      name: 'firstName',
      label: 'First Name',
      autoFocus: true,
      initialValue: 'Joe'
    }),
    
    m(mui.textInput, {
      name: 'lastName',
      label: 'Last Name',
      initialValue: 'Bloggs'
    })
  )
)
```
