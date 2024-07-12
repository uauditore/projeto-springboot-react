package br.com.api.produtos.serviço;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.api.produtos.modelo.UserModelo;
import br.com.api.produtos.repositório.UserRepositorio;

@Service
public class UserServico {

    @Autowired
    private UserRepositorio userRepositorio;

    public boolean authenticate(String email, String password) {
        UserModelo user = userRepositorio.findByEmail(email);
        return user != null && user.getPassword().equals(password);
    }
}
