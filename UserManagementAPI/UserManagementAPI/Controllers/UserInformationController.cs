using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace UserManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserInformationController : ControllerBase
    {
        private static List<UserInformation> userInfos = new List<UserInformation>
        {
            new UserInformation { Id = 1, Email = "spencerbacay1@gmail.com", Name = "Dave Bacay1", PhoneNumber = "09123123123"  },
            new UserInformation { Id = 2, Email = "spencerbacay2@gmail.com", Name = "Dave Bacay2", PhoneNumber = "09123123123"  },
            new UserInformation { Id = 3, Email = "spencerbacay3@gmail.com", Name = "Dave Bacay3", PhoneNumber = "09123123123"  },
        };

        private readonly DataContext _dataContext;

        public UserInformationController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        [HttpGet]
        public async Task<ActionResult<List<UserInformation>>> Get()
        {
            return Ok(await _dataContext.UserInformations.ToListAsync());
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<UserInformation>> Get(int id)
        {
            var userInfo = await _dataContext.UserInformations.FindAsync(id);  
            if(userInfo == null)
            {
                return BadRequest("User not found.");
            }

            return Ok(userInfo);
        }

        [HttpPost]
        public async Task<ActionResult<List<UserInformation>>> AddUser(UserInformation userInfo)
        {
            _dataContext.UserInformations.Add(userInfo);
            await _dataContext.SaveChangesAsync();
            return Ok(await _dataContext.UserInformations.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<UserInformation>>> UpdateUser(UserInformation request)
        {
            var userInfo = await _dataContext.UserInformations.FindAsync(request.Id);
            if(userInfo == null)
            {
                return BadRequest("User not found.");
            }

            userInfo.Name = request.Name;
            userInfo.PhoneNumber = request.PhoneNumber;
            userInfo.Email = request.Email;

            await _dataContext.SaveChangesAsync();

            return Ok(await _dataContext.UserInformations.ToListAsync());
        }

        [HttpDelete("{id}")]

        public async Task<ActionResult<List<UserInformation>>> Delete(int id)
        {
            var userInfo = await _dataContext.UserInformations.FindAsync(id);
            if(userInfo == null)
            {
                return BadRequest("User not found.");
            }

            _dataContext.UserInformations.Remove(userInfo);
            await _dataContext.SaveChangesAsync();
            return Ok(userInfo);
        }
    }
}
