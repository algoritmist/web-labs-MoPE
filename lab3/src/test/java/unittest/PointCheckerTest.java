package unittest;

import com.weblabs.lab3.beans.PointBean;
import com.weblabs.lab3.beans.ResultsBean;
import com.weblabs.lab3.util.PointChecker;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class PointCheckerTest {
    @Test
    public void testHit(){
        PointBean bq1 = new PointBean(1, 2, 4); // out
        assertFalse(PointChecker.checkPoint(bq1));

        PointBean bq21 = new PointBean(-1, 2, 4); // out
        PointBean bq22 = new PointBean(-1, 1, 4); // in

        assertFalse(PointChecker.checkPoint(bq21));
        assertTrue(PointChecker.checkPoint(bq22));

        PointBean bq31 = new PointBean(-3, -3, 4); // out
        PointBean bq32 = new PointBean(-1, -2, 4); // in

        assertFalse(PointChecker.checkPoint(bq31));
        assertTrue(PointChecker.checkPoint(bq32));

        PointBean bq41 = new PointBean(2, -1, 4); // out
        PointBean bq42 = new PointBean(1, -1, 4); // in

        assertFalse(PointChecker.checkPoint(bq41));
        assertTrue(PointChecker.checkPoint(bq42));


    }
}
