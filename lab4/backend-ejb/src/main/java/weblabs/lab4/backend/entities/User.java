package weblabs.lab4.backend.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Table(name="users")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@NamedQuery(name = "user.findByUsername", query = "select user from User user where user.username=:username")
@NamedQuery(name = "user.findById", query = "select user from User user where user.id=:userId")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    long id;
    @Column(unique = true, nullable = false)
    String username;
    @Column(name="password", nullable = false)
    byte[] passwordHash;
    @Column(nullable = false)
    String salt;

    @Transient
    String password;

    @Transient
    @OneToMany(cascade = CascadeType.ALL)
    List<Point> points;
}
