package br.com.api.produtos.repositório;
import br.com.api.produtos.modelo.UserModelo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepositorio extends JpaRepository<UserModelo, Long> {
    UserModelo findByEmail(String email);
}
