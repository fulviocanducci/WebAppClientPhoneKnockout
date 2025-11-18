using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAppClientPhone.Models;
namespace WebAppClientPhone.Controllers
{
    public class ClientsController : Controller
    {
        private readonly DatabaseCtx _context;

        public ClientsController(DatabaseCtx context)
        {
            _context = context;
            _context.Database.EnsureCreated();
        }

        public async Task<IActionResult> Index()
        {
            return View(await _context.Clients.ToListAsync());
        }

        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            var client = await _context.Clients.FirstOrDefaultAsync(m => m.Id == id);
            if (client == null)
            {
                return NotFound();
            }
            return View(client);
        }

        public IActionResult Create()
        {
            return View("CreateOrEdit");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Client client)
        {
            if (ModelState.IsValid)
            {
                _context.Add(client);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View("CreateOrEdit", client);
        }

        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            var client = await _context.Clients.FindAsync(id);
            if (client == null)
            {
                return NotFound();
            }
            return View("CreateOrEdit", client);
        }


        [NonAction]
        private async Task<List<Phone>> GetPhonesByClientId(int clientId)
        {
            return await _context.Phones.AsNoTracking().Where(c => c.ClientId == clientId).ToListAsync();
        }

        [HttpGet("[controller]/phones/client-{id}")]
        public async Task<JsonResult> GetPhones(int id)
        {
            return Json(await GetPhonesByClientId(id));
        }

        [HttpPost("[controller]/phones/remove-{id}-{clientId}")]
        public async Task<JsonResult> RemovePhone(int id, int clientId)
        {
            await _context.Phones.Where(c => c.Id == id).ExecuteDeleteAsync();
            return Json(await GetPhonesByClientId(clientId));
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, Client client)
        {
            if (id != client.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(client);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ClientExists(client.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Edit), new { client.Id });
            }
            return View("CreateOrEdit", client);
        }

        // GET: Clients/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var client = await _context.Clients
                .FirstOrDefaultAsync(m => m.Id == id);
            if (client == null)
            {
                return NotFound();
            }

            return View(client);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var client = await _context.Clients.FindAsync(id);
            if (client != null)
            {
                _context.Clients.Remove(client);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ClientExists(int id)
        {
            return _context.Clients.Any(e => e.Id == id);
        }

        [HttpGet]
        public async Task<IActionResult> Search()
        {            
            return View();
        }

        [HttpPost("[controller]/search/by/name")]
        public async Task<IActionResult> SearchPost(SelectTerm selectTerm)
        {
            var result = await _context.Clients.AsNoTracking()
                .Where(c => c.Name.Contains(selectTerm.Q))
                .Take(100)
                .Select(c => SelectItemFabric.Create(c.Id, c.Name))
                .ToListAsync();
            return Json(SelectResultFabric.Create(result));
        }
    }
}
