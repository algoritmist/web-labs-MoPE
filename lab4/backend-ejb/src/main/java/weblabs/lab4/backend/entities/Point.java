package weblabs.lab4.backend.entities;

import com.google.gson.annotations.Expose;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.text.DecimalFormat;

@Table(name="points")
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@NamedQuery(name = "point.findByUserId", query = "select point from Point point where point.user=:user")
public class Point {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    long id;
    @Expose
    @Column(nullable = false)
    double x, y, r;
    @Expose
    @Column(nullable = false)
    boolean result;
    @Expose
    @Column(name ="cur_time", nullable = false)
    long curTime;
    @Expose
    @Column(name ="exec_time", nullable = false)
    long execTime;

    @JoinColumn(name = "user_id", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    User user;
}
