package com.weblabs.lab3.beans;

import com.google.gson.Gson;

import javax.annotation.PostConstruct;
import javax.persistence.*;
import javax.transaction.*;
import java.io.Serializable;
import java.util.*;

public class ResultsBean implements Serializable {
    private LinkedList<AttemptBean> results;
    private PointBean pointBean;
    private boolean lastRequestResult = true;
    private final Gson parser = new Gson();

    //@PersistenceContext(unitName = "db")
    private final String unitName = "db";
    private EntityManager entityManager;
    private EntityTransaction transaction;

    public List<AttemptBean> getResults() {
        return results;
    }

    private void connect() {
        entityManager = Persistence.createEntityManagerFactory(unitName).createEntityManager();
        transaction = entityManager.getTransaction();
    }

    private void getData() {
        results = new LinkedList<>();
        transaction.begin();
        results.addAll(entityManager.createQuery("SELECT a FROM AttemptBean a", AttemptBean.class).getResultList());
        Collections.reverse(results);
        transaction.commit();
    }

    @PostConstruct
    public void init() {
        /*
        results = new ArrayList<>();
        results.addAll(entityManager.createQuery("SELECT a FROM attempt a", AttemptBean.class).getResultList());*/

        connect();
        getData();
    }

    public void setPointBean(PointBean pointBean) {
        this.pointBean = pointBean;
    }

    public PointBean getPointBean() {
        return pointBean;
    }

    public void handleAttempt() {
        lastRequestResult = false;
        if (pointBean.calcResult()) {
            AttemptBean a = new AttemptBean(pointBean);
            transaction.begin();
            entityManager.persist(a);
            results.addFirst(a);
            transaction.commit();
            lastRequestResult = true;
        }
    }

    public boolean isLastRequestResult() {
        return lastRequestResult;
    }

    public String getJsonResults() {
        return parser.toJson(results);
    }

    public double getLastR() {
        return (results.size() != 0) ? results.getLast().getR() : 1;
    }
}
