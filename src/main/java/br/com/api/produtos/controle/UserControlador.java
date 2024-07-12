package br.com.api.produtos.controle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.api.produtos.modelo.UserModelo;
import br.com.api.produtos.serviço.UserServico;

import java.util.Collections;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/users")
public class UserControlador {

    @Autowired
    private UserServico userServico;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserModelo user) {
        boolean authenticated = userServico.authenticate(user.getEmail(), user.getPassword());
        if (authenticated) {
            return ResponseEntity.ok(Collections.singletonMap("success", true));
        } else {
            return ResponseEntity.status(401)
                                 .body(Collections.singletonMap("message", "Invalid email or password"));
        }
    }
}

