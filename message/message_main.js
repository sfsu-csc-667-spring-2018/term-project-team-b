import moment from 'moment'
import {LOBBY, USER_JOINED, MESSAGE_SEND} from '../events/events'
import {messageReceived} from "./messages";

const socket = io()

const appendMessage = message => {
    $('.messages').append(message)
    $('.time.timeago').timeago()
}

const messageElement = ({timestamp, user, message}) =>
    $('<div>', {class: 'message'})
    .text(message)
    .prepend(timestampElement(timestamp), userElement(user))

cnost timestampElement = time => {
    const element = $('<time>', {
        class = 'timeago',
        datetime: moment(time).format()
    }).text(moment(time).format('hh:mm:ss'))
    return element[0]
}

const userElement = userName =>
    $('<span>', {class: 'user'}).text(userName)[0]

const userJoined = data =>
    appendMessage(messageElement(Object.assign(data,{user: `${data.user} said `})))

const initializeSocket = () => {
    socket.on(USER_JOINED, userJoined)
    socket.on(MESSAGE_SEND, messageReceived )
}

$(document).ready(() => {
    initializeSocket()
    socket.emit(USER_JOINED, {user, timestamp: Date.now()})

    $('#chat-area button').click(event => {
        const message = $('#chat-area input').val()
        $('#chat-area input').val('')
        socket.emit(MESSAGE_SEND, {user, timestamp: Date.now(), message})

    })
})