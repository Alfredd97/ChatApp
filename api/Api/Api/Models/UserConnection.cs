using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models;
    public class UserConnection
    {
        public required string UserName { get; set; }

        public string Room { get; set; }
    }