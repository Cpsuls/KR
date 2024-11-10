package org.example.kr;
import lombok.extern.slf4j.Slf4j;
import org.example.kr.Models.Product;
import org.example.kr.Models.Provider;
import org.example.kr.Models.User;
import org.example.kr.Services.ProductService;
import org.example.kr.Services.ProviderService;
//import org.example.kr.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextClosedEvent;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
@SpringBootApplication
@Slf4j
public class KrApplication implements CommandLineRunner, ApplicationListener<ContextClosedEvent> {

    @Autowired
    private ProviderService providerService;

    @Autowired
    private ProductService productService;

//    @Autowired
//    private UserService userService;
    private List<Product> createdProducts = new ArrayList<>();
    private List<User> createdUsers = new ArrayList<>();
    private List<Provider> createdProviders = new ArrayList<>();
    public static void main(String[] args) {
        SpringApplication.run(KrApplication.class, args);
    }
    @Override
    public void run(String... args) throws Exception {
        Provider provider1 = new Provider();
        provider1.setName("KFC");
        provider1 = providerService.saveProvider(provider1);
        createdProviders.add(provider1);
//        Provider provider2 = new Provider();
//        provider2.setName("BK");
//        provider2 = providerService.saveProvider(provider2);
//        createdProviders.add(provider2);
        Product beef = new Product();
        beef.setName("Beef");
        beef.setDescription("Tasty beef");
        beef.setPrice(BigDecimal.valueOf(190.0));
        beef.setProvider(provider1);
        beef = productService.saveProduct(beef);
//        createdProducts.add(beef);
//        Product cucumber = new Product();
//        cucumber.setName("Cucumber");
//        cucumber.setDescription("Tasty cucumber");
//        cucumber.setProvider(provider2);
//        cucumber = productService.saveProduct(cucumber);
//        createdProducts.add(cucumber);
//        Product icecream = new Product();
//        icecream.setName("IceCream");
//        icecream.setDescription("Chocolate Icecream");
//        icecream.setPrice(BigDecimal.valueOf(154.0));
//        icecream.setProvider(provider1);
//        icecream = productService.saveProduct(icecream);
//        createdProducts.add(icecream);
//        log.info("Created products: " + createdProducts.toString());
//        // Создание и сохранение пользователей
//        User admin = new User();
//        admin.setUsername("admin");
//        admin.setPassword("admin");
//        admin.setRole("ROLE_ADMIN");
//        admin = userService.saveUser (admin);
//        createdUsers.add(admin);
//        User user = new User();
//        user.setUsername("user");
//        user.setPassword("user");
//        user.setRole("ROLE_USER");
//        user = userService.saveUser (user);
//        createdUsers.add(user);
    }
    @Override
    public void onApplicationEvent(ContextClosedEvent event) {
//
//        for (Product product : createdProducts) {
//            productService.deleteProduct(product.getId());
//        }
//        log.info("Deleted products: " + createdProducts.toString());

//        for (User  user : createdUsers) {
//            userService.deleteUser (user.getId());
//        }
//        log.info("Deleted users: " + createdUsers.toString());

//        for (Provider provider : createdProviders) {
//            providerService.deleteProvider(provider.getId());
//        }
//        log.info("Deleted providers: " + createdProviders.toString());
    }
}