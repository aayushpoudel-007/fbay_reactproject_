const request = require('supertest');
const app = require('../index');


describe('API Endpoints Test', ()=>{

    //test 1: creating a user
    it('POST /api/user/create | Response with success message', async () => {
        const response = await request(app).post('/api/user/create').send({
            'firstName' : 'Aayush',
            'lastName' : 'Poudel',
            'email': 'ap@gmail.com',
            'password': '123456'
        })
        if(response.body.success){
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toEqual("User created successfully.");
        } else{
            expect(response.body.success).toBe(false);
            expect(response.body.message).toEqual("The user already exists");
        }
    })

    //test 2: Login user
    it("POST /api/user/login |  Response with valid JSON", async () => {
        const response = await request(app).post("/api/user/login").send({
          email: "aayushpoudel@gmail.com",
          password: "uuuuuu",
        });
        expect(response.statusCode).toBe(200);
      }, 40000);

    });


      //test 3: fetch a single user
      it("/GET /api/product/getUsers/:id | Response should be json", async () => {
        const response = await request(app).get(
          "/api/user/getUsers/65a92027165b61690f262ae2"
        );
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("user");
      });


    //test 3: Fetching all products
    it('GET /api/product/get_products | Response should be json', async () => {
        const response = await request(app).get('/api/product/get_products');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.message).toEqual("All the products have been fetched successfully");
    })

    //test 4: Fetching single product
    it('GET /api/product/get_product/:id | Response should be json', async () => {
        const response = await request(app)
        .get('/api/product/get_product/6583a241aa79864c6cbf9df9');

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('product');
    })


    //test 5: Creating a product
    it("POST /api/product/createProduct | Response with success message", async () => {
        const response = await request(app).post("/api/product/createProduct").send({
          productName: "fff",
          productPrice: "2424",
          productDescription: "dgbvfsdg", 
        });
        if (response.body.success) {
          expect(response.statusCode).toBe(200);
          expect(response.body.message).toEqual("The product has been created successfully");
        } else {
          expect(response.body.success).toBe(false);
        
        }
      });


      //test 6: deleting a product
      it("DELETE /api/product/deleteProduct/:id | Response with success message", async () => {
        
        const response = await request(app).delete(`/api/product/deleteProduct/6583a241aa79864c6cbf9df9`);
      
        if (response.body.success) {
          expect(response.statusCode).toBe(200);
          expect(response.body.message).toEqual("The product has been successfully deleted");
        } else {
          expect(response.body.success).toBe(false);
        }
      });
      
   
    // // updating product
    // it("PUT /api/product/updateProduct/:id | Response should be json", async () => {
    //   if (!token) {
    //     throw new Error("Token is not defined");
    //   }
   
    //   const productUpdate = {
    //     productName: "Updated Category",
    //     productDescription: "Updated details",
    //     productPrice: "300",
    //   };
   
    //   const res = await request(app)
    //     .put("/api/product/updateProduct/65d63fbb634d779c11c15765")
    //     .set("Authorization", `Bearer ${token}`)
    //     .field("productName", productUpdate.productName)
    //     .field("productDescription", productUpdate.productDescription)
    //     .field("productPrice", productUpdate.productPrice)
   
    //   expect(res.statusCode).toEqual(200);
    //   expect(res.body).toHaveProperty("success", true);
    //   expect(res.body).toHaveProperty("message", "Product updated successfully.");
    //   expect(res.body).toHaveProperty("product");
    // }};