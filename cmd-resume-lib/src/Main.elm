module Main exposing (main)

import Json.Decode exposing (Value)
import Platform


type alias Model =
    { flags : Value
    }


type Msg
    = NoOp


init : Value -> ( Model, Cmd Msg )
init flags =
    ( { flags = flags }, Cmd.none )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none


main : Program Value Model Msg
main =
    Platform.worker
        { init = init
        , update = update
        , subscriptions = subscriptions
        }
