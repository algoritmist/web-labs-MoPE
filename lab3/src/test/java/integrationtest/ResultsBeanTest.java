package integrationtest;

import com.weblabs.lab3.beans.AttemptBean;
import com.weblabs.lab3.beans.PointBean;
import com.weblabs.lab3.beans.ResultsBean;
import org.junit.jupiter.api.Test;

import javax.accessibility.AccessibleText;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class ResultsBeanTest {
    private final ResultsBean db;

    public ResultsBeanTest() {
        db = new ResultsBean();
    }

    @Test
    public void contentTest() {
        PointBean bq1 = new PointBean(1, 2, 4); // out

        PointBean bq21 = new PointBean(-1, 2, 4); // out
        PointBean bq22 = new PointBean(-1, 1, 4); // in

        PointBean bq31 = new PointBean(-1, -2, 4); // in
        PointBean bq32 = new PointBean(-3, -3, 4); // out

        PointBean bq41 = new PointBean(1, 1, 4); // in
        PointBean bq42 = new PointBean(2, 1, 4); // out

        Set<PointBean> beans = Set.of(bq1, bq21, bq22, bq31, bq32, bq41, bq42);
        for (PointBean bean : beans) {
            db.setPointBean(bean);
            db.handleAttempt();
        }

        List<AttemptBean> results = db.getResults();
        assertEquals(results.size(), beans.size());
        for (AttemptBean bean : results) {
            PointBean p = new PointBean(bean.getX(), bean.getY(), bean.getR());
            assertEquals(p.calcResult(), bean.getResult());
            assertTrue(beans.contains(p));
        }

    }
}
