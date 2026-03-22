using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            var users = await _userService.GetAllAsync();
            var data = users.Select(u => new UserResponseDto
            {
                Id = u.Id,
                UserName = u.UserName,
                Email = u.Email,
                Role = u.Role,
                PhoneNumber = u.PhoneNumber,
                Address = u.Address,
                Image = u.Image
            }).ToList();

            return Ok(new
            {
                Success = true,
                Message = "Users retrieved successfully.",
                Data = data
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Success = false, Message = "Error retrieving users.", Error = ex.Message });
        }
    }

    [HttpGet("{id}")]
    [Authorize]
    public async Task<IActionResult> GetById(string id)
    {
        try
        {
            var user = await _userService.GetByIdAsync(id);
            if (user is null)
                return NotFound(new { Success = false, Message = $"User with ID {id} not found." });

            return Ok(new
            {
                Success = true,
                Message = "User found.",
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
            return StatusCode(500, new { Success = false, Message = "Error retrieving user.", Error = ex.Message });
        }
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> UpdateUser(string id, [FromBody]  UpdateUserDto dto)
    {
        try
        {
            var existing = await _userService.GetByIdAsync(id);
            if (existing is null)
                return NotFound(new { Success = false, Message = "User not found for update." });

            if (dto.UserName != null) existing.UserName = dto.UserName;
            if (dto.Email != null) existing.Email = dto.Email;
            if (dto.PhoneNumber != null) existing.PhoneNumber = dto.PhoneNumber;
            if (dto.Address != null) existing.Address = dto.Address;
            if (dto.Image != null) existing.Image = dto.Image;

            await _userService.UpdateAsync(id, existing);

            return Ok(new { Success = true, Message = "User updated successfully." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Success = false, Message = "Error updating user.", Error = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteUser(string id)
    {
        try
        {
            var existing = await _userService.GetByIdAsync(id);
            if (existing is null)
                return NotFound(new { Success = false, Message = "User not found for deletion." });

            await _userService.DeleteAsync(id);
            return Ok(new { Success = true, Message = "User deleted successfully." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Success = false, Message = "Error deleting user.", Error = ex.Message });
        }
    }
}