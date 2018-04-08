package com.diyiliu.plugin.model;

/**
 * Description: Point
 * Author: DIYILIU
 * Update: 2017-08-03 17:51
 */
public class Point {

    private double lng;
    private double lat;

    /** 省份 */
    private String province;
    /** 城市 */
    private String city;
    /** 区县 */
    private String area;

    public Point() {
    }

    public Point(double lng, double lat) {
        this.lng = lng;
        this.lat = lat;
    }

    public double getLng() {
        return lng;
    }

    public void setLng(double lng) {
        this.lng = lng;
    }

    public double getLat() {
        return lat;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }


    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }
}
