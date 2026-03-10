using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("")]
public class AuthController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly JwtTokenGenerator _jwtTokenGenerator;

    public AuthController(IUserService userService, JwtTokenGenerator jwtTokenGenerator)
    {
        _userService = userService;
        _jwtTokenGenerator = jwtTokenGenerator;
    }

    [HttpPost("signup")]
    public async Task<IActionResult> Register(CreateUserDto dto)
    {
        try
        {
            var existing = await _userService.GetByEmailAsync(dto.Email);
            if (existing != null)
                return Conflict(new { Success = false, Message = "Email already registered." });

            var user = new User
            {
                UserName = dto.UserName,
                Email = dto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password), 
                Role = dto.Role,
                PhoneNumber = dto.PhoneNumber,
                Address = dto.Address,
                Image = dto.Image
            };

            await _userService.CreateAsync(user);

            return Ok(new
            {
                Success = true,
                Message = "User registered successfully.",
                Data = new UserResponseDto
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    Email = user.Email,
                    Role = user.Role,
                    PhoneNumber = user.PhoneNumber,
                    Address = user.Address,
                    Image = user.Image
                }
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Success = false, Message = "Error during registration.", Error = ex.Message });
        }
    }

    [HttpPost("signin")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        try
        {
            Console.WriteLine($">>> Email: '{dto.Email}', Pass null: {dto.Password == null}");

            var user = await _userService.GetByEmailAsync(dto.Email);
            Console.WriteLine($">>> User found: {user != null}");

            if (user is null)
                return Unauthorized(new { Success = false, Message = "Invalid email or password." });

            bool isValid = BCrypt.Net.BCrypt.Verify(dto.Password, user.Password);
            Console.WriteLine($">>> Password valid: {isValid}");

            if (!isValid)
                return Unauthorized(new { Success = false, Message = "Invalid email or password." });

            var token = _jwtTokenGenerator.GenerateToken(user); 
            

            return Ok(new
            {
                Success = true,
                Message = "Login successful.",
                Token = token,
                Data = new UserResponseDto
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    Email = user.Email,
                    Role = user.Role,
                    PhoneNumber = user.PhoneNumber,
                    Address = user.Address,
                    Image = user.Image
                }
            });
        }
        catch (Exception ex)
        {
            Console.WriteLine($">>> EXCEPTION: {ex.Message}");

            return StatusCode(500, new { Success = false, Message = "Error during login.", Error = ex.Message });
        }
    }
}