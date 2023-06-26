
package hac;

import hac.repo.Purchase;
import hac.repo.PurchaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/purchases")
public class PurchasesController {
    @Autowired
    private PurchaseRepository repository;  // this is the JPA repository (SQL database)

    @GetMapping("/all")
    public List<Purchase> showPurchases() {
        return repository.findAll(); // this is a JPA method to get all the purchases
    }

    @PostMapping("/add")
    public Purchase addPurchase(@RequestBody Purchase purchase) {
        return repository.save(purchase);
    }
}
