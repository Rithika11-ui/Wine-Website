using System.ComponentModel.DataAnnotations;

public class CreateUserDto
{
    [Required, MaxLength(100)]
    public required string UserName { get; set; }

    [Required, EmailAddress]
    [RegularExpression(@"^[a-z0-9._%+-]+@(gmail|yahoo)\.com$", ErrorMessage = "Email is not correct.")]
    public required string Email { get; set; }

    [Required, MinLength(8), MaxLength(100)]
    [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$", ErrorMessage = "Password must have uppercase, lowercase, and a number")]
    public required string Password { get; set; }

    public UserRole Role { get; set; } = UserRole.Customer;

    [Phone, MinLength(9), MaxLength(20)]
    public string PhoneNumber { get; set; } = string.Empty;

    [MaxLength(250)]
    public string Address { get; set; } = string.Empty;

    [MaxLength(255)]
    public string Image { get; set; } = string.Empty;
}

public class UpdateUserDto
{
    [MaxLength(100)]
    public string? UserName { get; set; }

    [EmailAddress]
    public string? Email { get; set; }

    [Phone]
    public string? PhoneNumber { get; set; }

    public string? Address { get; set; }

    [MaxLength(255)]
    public string? Image { get; set; }

}

public class UserResponseDto
{
    public string Id { get; set; } = string.Empty;
    public string UserName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
    public UserRole Role { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}

