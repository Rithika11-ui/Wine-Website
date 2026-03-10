// Dto/BannerDto.cs
using System.ComponentModel.DataAnnotations;

    public class CreateBannerDto
    {
        [Required(ErrorMessage = "Title is required")]
        [MinLength(3, ErrorMessage = "Title must be at least 3 characters")]
        [MaxLength(100, ErrorMessage = "Title cannot exceed 100 characters")]
        public required string Title { get; set; }

        [MaxLength(200, ErrorMessage = "Subtitle cannot exceed 200 characters")]
        public string? Subtitle { get; set; }

        [MaxLength(1000, ErrorMessage = "Description cannot exceed 1000 characters")]
        public string? Description { get; set; }

        [MaxLength(50, ErrorMessage = "Button text cannot exceed 50 characters")]
        public string? ButtonText { get; set; }

        [MaxLength(200, ErrorMessage = "Button link cannot exceed 200 characters")]
        public string? ButtonLink { get; set; }

        [Required(ErrorMessage = "Position is required")]
        [RegularExpression("Home|Shop|Blog|All|About Us|Contact Us",
            ErrorMessage = "Position must be Home, Shop, Blog, About Us, Contact Us or All")]
        public string Position { get; set; } = "Home";

        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool IsActive { get; set; } = true;

        [Range(0, 100, ErrorMessage = "Sort order must be between 0 and 100")]
        public int SortOrder { get; set; } = 0;

        public IFormFile? Image { get; set; }
        // public IFormFile? MobileImage { get; set; }
    }

    public class UpdateBannerDto
    {
        [MinLength(3, ErrorMessage = "Title must be at least 3 characters")]
        [MaxLength(100, ErrorMessage = "Title cannot exceed 100 characters")]
        public string? Title { get; set; }

        [MaxLength(200, ErrorMessage = "Subtitle cannot exceed 200 characters")]
        public string? Subtitle { get; set; }

        [MaxLength(1000, ErrorMessage = "Description cannot exceed 1000 characters")]
        public string? Description { get; set; }

        [MaxLength(50, ErrorMessage = "Button text cannot exceed 50 characters")]
        public string? ButtonText { get; set; }

        [MaxLength(200, ErrorMessage = "Button link cannot exceed 200 characters")]
        public string? ButtonLink { get; set; }

        [RegularExpression("Home|Shop|Blog|All|About Us|Contact Us",
            ErrorMessage = "Position must be Home, Shop, Blog, About Us, Contact Us or All")]
        public string? Position { get; set; }

        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool? IsActive { get; set; }

        [Range(0, 100, ErrorMessage = "Sort order must be between 0 and 100")]
        public int? SortOrder { get; set; }

        public IFormFile? Image { get; set; }
        // public IFormFile? MobileImage { get; set; }
    }

    public class BannerResponseDto
    {
        public string Id { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string? Subtitle { get; set; }
        public string? Description { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        // public string? MobileImageUrl { get; set; }
        public string? ButtonText { get; set; }
        public string? ButtonLink { get; set; }
        public string Position { get; set; } = string.Empty;
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool IsActive { get; set; }
        public int SortOrder { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    
}