using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BankingAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly DataContext _context;

        public UserController(DataContext context)
        {
            _context = context;
        }

        //GETs all the people in the database
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var result = await _context.users.ToListAsync();

            if (result == null)
                return NoContent();

            return Ok(result);
        }

        //POSTs new person into the database
        [HttpPost]
        public async Task<ActionResult<User>> CreateUser(User user)
        {
            _context.users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUsers", new { id = user.id }, user);
        }

       //GETs all the users with a specific email
        [HttpGet("{email}")]
        public async Task<ActionResult<User>> GetPersonByEmail(string email)
        {
            var users = await _context.users
                .Where(x => x.email.Equals(email))
                .ToListAsync();

            if (users == null)
                return NoContent();

            return Ok(users);
        
        }

        private bool UserExists(int id)
        {
            return (_context.users?.Any(e => e.id == id)).GetValueOrDefault();
        }
    }
}
