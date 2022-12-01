using Microsoft.AspNetCore.SignalR;

namespace Simple_Rūmu.Hubs
{
	public class MessageHub : Hub
	{
        public async Task SendStatus(int status)
        {
            await Clients.Others.SendAsync("MovieStatus", status);
        }

        public async Task SendTime(double time)
        {
            await Clients.Others.SendAsync("MovieTime", time);
        }

        public async Task SendMessage(string msg)
        {
            await Clients.Others.SendAsync("Messages", msg);
        }
    }
}
