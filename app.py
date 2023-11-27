from flask import Flask, render_template, request,url_for, redirect, jsonify
from flask_cors import CORS
import mysql.connector


app = Flask(__name__)
CORS(app)

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root",
    database="register"
)

if db.is_connected():
   print("Connection established")	

@app.route('/')
def demopage():
    return render_template('userregister.html')
   

@app.route('/userregister', methods=['POST','GET'])
def userregister():
    if request.method == 'POST' : 
        try:
            data = request.json 
            print("Received JSON data:", data)

            partner_type = data.get('partnerType')
            name = data.get('name')
            email = data.get('email')
            mobile = data.get('mobno')
            pan = data.get('pan')
            pin_code = data.get('pinCode')
            kyc = data.get('kyc')
            kyc_document = data.get('upload')
            password = data.get('pass')
            confirmpassword = data.get('confpass')

            print(partner_type, name, email, mobile, pan, pin_code, kyc, kyc_document, password, confirmpassword)

            cursor = db.cursor()
            cursor.execute("INSERT INTO users (partner_type, name, email, mobile, pan, pin_code, kyc, kyc_document, password, confirmpassword) "
                "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", 
                (partner_type, name, email, mobile, pan, pin_code, kyc, kyc_document, password, confirmpassword))
            db.commit()
            cursor.close()
            return data
            # return redirect(url_for('success_page'))
        except Exception as e:
            print("Error:", str(e))
            return jsonify({"error": str(e)}), 500  # Return error response with 500 status code

if __name__ == '__main__':
    app.run(debug=True)

