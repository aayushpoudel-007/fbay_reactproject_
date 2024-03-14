import axios from "axios";
import FormData from "form-data";
import login_mock from "../mock/login_mock";

const backendURL = "http://localhost:5000";

describe("Pedaption testing", () => {
  let authToken;

  it("POST /api/user/login | should return 200", async () => {
    const res = await axios.post(`${backendURL}/api/user/login`, login_mock);
    expect(res.status).toBe(400);
    expect(res.data.success).toBe(false);
    

    // Store the token for later use
    authToken = res.data.token;
  });

  it("GET /api/user/:id | should return 200", async () => {
    // Make sure authToken is defined
    expect(authToken).toBeDefined();


    const headers = {
      Authorization: `Bearer ${authToken}`,
    };

    const res = await axios.get(
      `${backendURL}/api/user/65e2ac9725338fdde5a1721c`,
      { headers }
    );

    expect(res.status).toBe(200);
    expect(res.data.success).toBe(true);
    expect(res.data.user).toBeDefined();
    console.log(res.data.user);
  });

  it("GET /api/product/get_products | should return 200", async () => {
    // Make sure authToken is defined
    expect(authToken).toBeDefined();

    const headers = {
      Authorization: `Bearer ${authToken}`,
    };

    const res = await axios.get(
      `${backendURL}/api/product/get_products`,
      { headers }
    );

    expect(res.status).toBe(200);
    expect(res.data.success).toBe(true);
    expect(res.data.products).toBeDefined();
    console.log(res.data);
  });

  it("GET /api/product/get_product/:id | should return 200", async () => {
    // Make sure authToken is defined
    expect(authToken).toBeDefined();

    const headers = {
      Authorization: `Bearer ${authToken}`,
    };

    const res = await axios.get(
      `${backendURL}/api/product/get_product/65d8c052adb551cdf9289a9a`,
      { headers }
    );

    expect(res.status).toBe(200);
    expect(res.data.success).toBe(true);
    expect(res.data.product).toBeDefined();
    console.log(res.data);
  });





  it("DELETE /api/post/delete/:id | should return 200", async () => {
    // Make sure authToken is defined
    expect(authToken).toBeDefined();

    const headers = {
      Authorization: `Bearer ${authToken}`,
    };

    const res = await axios.delete(
      `${backendURL}/api/v1/post/delete/65e34cf2fcc77518d43ad183`,
      { headers }
    );

    expect(res.status).toBe(200);
    expect(res.data.success).toBe(true);
    expect(res.data.message).toBe("Post deleted successfully");
    console.log(res.data);
  });

  it("GET /api/category/allCategories | should return 200", async () => {
    // Make sure authToken is defined
    expect(authToken).toBeDefined();

    const headers = {
      Authorization: `Bearer ${authToken}`,
    };

    const res = await axios.get(
      `${backendURL}/api/category/allCategories`,
      { headers }
    );

    expect(res.status).toBe(200);
    expect(res.data.success).toBe(true);
    expect(res.data.message).toBe("All Categories List");
    console.log(res.data);
  });

  it("POST /api/post/comment/:id | should return 200", async () => {
    // Make sure authToken is defined
    expect(authToken).toBeDefined();

    const headers = {
      Authorization: `Bearer ${authToken}`,
    };

    const res = await axios.post(
      `${backendURL}/api/v1/post/comment/65e074d4707f904cd1832030`,
      { comment: "This is a test comment" },
      { headers }
    );

    expect(res.status).toBe(201);
    expect(res.data.success).toBe(true);
    expect(res.data.message).toBe("Comment added successfully");
    console.log(res.data);
  });
});
