# @regression @multi-user @realtime
# Feature: Multi-User Chat
#   As multiple users
#   I want to be able to chat with other users in real-time
#   So that we can have conversations
#
#   Background:
#     Given the chat application is running
#
#   Scenario: Multiple users can join and chat
#     Given user "Ana" is logged in
#     And user "Juan" is logged in
#     When Ana sends message "Hello Bob!"
#     Then Juan should see the message from Ana
#     When Juan sends message "Hi Alice!"
#     Then Ana should see the message from Juan
#
#   Scenario: User join notifications
#     Given user "Ana" is logged in
#     When user "Charly" logs in
#     Then Ana should see "Charly joined the chat"
#     And Charly should see the chat interface
#
#   Scenario: Real-time message delivery
#     Given user "Ana" and "Juan" are both logged in
#     When Ana sends message "Real-time test"
#     Then Juan should see the message immediately
#     And the message should show the correct timestamp
#
#   Scenario: Multiple users sending messages simultaneously
#     Given user "Ana", "Juan", and "Charly" are all logged in
#     When Ana sends message "Message 1"
#     And Juan sends message "Message 2"
#     And Charly sends message "Message 3"
#     Then all users should see all three messages
#     And the messages should be in chronological order
#
#   Scenario: User leaves chat
#     Given user "Ana" and "Juan" are both logged in
#     When Ana closes the browser
#     Then Juan should see "Ana left the chat"
