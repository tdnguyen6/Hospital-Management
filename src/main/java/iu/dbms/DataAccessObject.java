package iu.dbms;

import java.sql.*;

@SuppressWarnings("ALL")
public class DataAccessObject {
  public DataAccessObject() {
    String dbURL = "jdbc:mysql://remotemysql.com:3306/FnMeRpbnbR";
    String user = "FnMeRpbnbR";
    String pass = "L80gQihFFu";
    String query = "";

    PreparedStatement prSt = null;
    ResultSet res = null;
    Connection con = null;

    {
      try {
        Class.forName("com.mysql.jdbc.jc.Driver");
        con = DriverManager.getConnection(dbURL, user, pass);
        prSt = con.prepareStatement(query);
        res = prSt.executeQuery();
        res.next();
        prSt.close();
        con.close();
      } catch (SQLException | ClassNotFoundException e) {
        System.out.println("Exception ocurred in DAO");
        e.printStackTrace();
      }
    }
  }
}
