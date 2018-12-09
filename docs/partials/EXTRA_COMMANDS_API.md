#### Types of commands

-   `basic` - a basic command that will just return the string value of data
    argument

-   `system` - a command that will not rely on any data and purely uses the
    browse or jQuery Terminal API

-   `calculated` - a command that will perform a basic operation on the data
    argument

-   `array` - a command that will take an array and perform a series of
    operations to display it

#### Required parameters

| type       | name | title | description | data | handler | handlers |
| ---------- |:----:|:-----:|:-----------:|:----:|:-------:|:--------:|
| basic      | ✔    | -     | ✔           | ✔    | ✖       | ✖        |
| system     | ✔    | -     | ✔           | ✖    | ✔       | ✖        |
| calculated | ✔    | -     | ✔           | ✔    | ✔       | ✖        |
| array      | ✔    | -     | ✔           | ✔    | ✖       | ✔        |

*Note:* `title` is never a required field and will default to the same value as
`name`
