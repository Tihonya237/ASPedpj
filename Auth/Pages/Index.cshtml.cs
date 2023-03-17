using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Localization;

namespace RazorPagesLogin.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;
        private readonly IStringLocalizer<IndexModel> _localizer;

        public IndexModel(ILogger<IndexModel> logger,
        IStringLocalizer<IndexModel> localizer)
        {
            _logger = logger;
            _localizer = localizer;
        }

        public void OnGet()
        {
            // Здесь локализация для элементов классов а не страниц
            //ViewData["Message"] = _localizer["Hello"];
        }
    }
}