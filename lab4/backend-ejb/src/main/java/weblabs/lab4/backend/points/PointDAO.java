package weblabs.lab4.backend.points;

import weblabs.lab4.backend.entities.Point;
import weblabs.lab4.backend.entities.User;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedList;

@Stateless
@Transactional
public class PointDAO {
    @PersistenceContext(unitName = "db")
    EntityManager entityManager;

    public ArrayList<Point> getPoints(User user) {
        ArrayList<Point> points =  (ArrayList<Point>) entityManager.createNamedQuery("point.findByUserId", Point.class)
                .setParameter("user", user)
                .getResultList();
        Collections.reverse(points);
        return points;
    }

    public void create(Point point) {
        entityManager.persist(point);
        entityManager.flush();
    }
}
