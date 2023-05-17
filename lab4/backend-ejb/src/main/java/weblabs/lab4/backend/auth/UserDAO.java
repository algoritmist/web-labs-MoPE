package weblabs.lab4.backend.auth;

import weblabs.lab4.backend.entities.User;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.security.NoSuchAlgorithmException;
import java.util.List;

@Stateless
@Transactional
public class UserDAO {
    @PersistenceContext(unitName = "db")
    private EntityManager entityManager;

    private final PasswordService passwordService = new PasswordService();

    public UserDAO() throws NoSuchAlgorithmException {
    }

    public void create(User user) {
        user.setSalt(passwordService.generateSalt());
        user.setPasswordHash(passwordService.encryptPassword(user.getPassword(), user.getSalt()));
        entityManager.persist(user);
        entityManager.flush();
    }

    public User findUserByUsername(String username) {
        List<User> res = entityManager.createNamedQuery("user.findByUsername", User.class)
                .setParameter("username", username)
                .getResultList();
        if (res.size() == 0) {
            return null;
        }
        return res.get(0);
    }

    public User findUserById(long id) {
        List<User> res = entityManager.createNamedQuery("user.findById", User.class)
                .setParameter("userId", id)
                .getResultList();
        if (res.size() == 0) {
            return null;
        }
        return res.get(0);
    }
}
