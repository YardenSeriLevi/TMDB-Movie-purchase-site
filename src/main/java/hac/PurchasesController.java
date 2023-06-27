
package hac;

import hac.repo.Purchase;
import hac.repo.PurchaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
/**
 * This server is responsible for saving the shopping carts in the database
 */
@RestController
@RequestMapping("/purchases")
public class PurchasesController {
    @Autowired
    private PurchaseRepository repository;  // this is the JPA repository (SQL database)

    /**
     * This function responsible for saving the cart in the database
     * @param purchase
     * @return Returns a positive seat or an error if the cart was actually saved in the database
     */
    @PostMapping("/add")
    public Purchase addPurchase(@RequestBody Purchase purchase) {
        return repository.save(purchase);
    }
}
