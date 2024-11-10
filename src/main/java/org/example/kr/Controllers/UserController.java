//package org.example.kr.Controllers;
//
//import org.example.kr.Models.User;
//import org.example.kr.Services.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/users")
//@CrossOrigin(origins = "http://localhost:3000")
//public class UserController {
//    @Autowired
//    private UserService userService;
//
//    @GetMapping
//    public List<User> getAllUsers(){
//        return userService.getAllUsers();
//    }
//    @GetMapping("/{id}")
//    public User getUserById(@PathVariable Long id) {
//        return userService.getUserById(id);
//    }
//
//    @PostMapping
//    public User createUser(@RequestBody User user) {
//        return userService.saveUser(user);
//    }
//
//    @PutMapping("/{id}")
//    public User updateUser(@PathVariable Long id, @RequestBody User user) {
//        user.setId(id);
//        return userService.saveUser(user);
//    }
//}
