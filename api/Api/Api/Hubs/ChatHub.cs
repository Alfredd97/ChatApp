using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Models;
using Microsoft.AspNetCore.SignalR;

namespace Api.Hubs;

public class ChatHub(
    IDictionary<string, UserConnection> connection,
    ILogger<ChatHub> logger
) : Hub
{
    public async Task SendMessage(string message)
    {
        if (connection.TryGetValue(Context.ConnectionId, out UserConnection user))
        {
            logger.LogInformation($"User {user.UserName} sent message: {message}");
            await Clients.Group(user.Room)
                .SendAsync("ReceiveMessage", user.UserName, message, DateTime.Now);
        }
    }

    public Task SendConnectedUser(string room)
    {
        var users = connection.Values
            .Where(u => u.Room == room)
            .Select(u => u.UserName);
        return Clients.Group(room).SendAsync("ReceiveConnectedUser", users);
    }

    public async Task JoinRoom(UserConnection userConnection)
    {
        logger.LogInformation($"User {userConnection.UserName} joined the room {userConnection.Room}");
        await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);
        connection[Context.ConnectionId] = userConnection;
        await Clients.Group(userConnection.Room)
            .SendAsync("ReceiveMessage", "Bot Chat", $"{userConnection.UserName} has joined the room.", DateTime.Now);
        await SendConnectedUser(userConnection.Room);
    }

    public override Task OnDisconnectedAsync(Exception exception)
    {
        if (connection.TryGetValue(Context.ConnectionId, out UserConnection user))
        {
            Clients.Group(user.Room)
                .SendAsync("ReceiveMessage","Chat bot", $"{user.UserName} has left the room.", DateTime.Now);
            SendConnectedUser(user.Room);
            return base.OnDisconnectedAsync(exception);
        }

        return base.OnDisconnectedAsync(exception);
    }
}