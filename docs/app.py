from flask import Flask, render_template

tData = {'Name': 'You'}

app = Flask(__name__)

@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/contact')
def contact():
    return render_template('contact.html')


@app.route('/countertops')
def countertops():
    return render_template('countertops.html')


@app.route('/gallery')
def gallery():
    return render_template("gallery.html")

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/login')
def renderLogoin():
    return render_template("login.html")


@app.route('/recommendations')
def routeRecommendations():
    return render_template('recommendations.html')


@app.route('/testimonials')
def testimonials():
    return render_template('testimonials.html')


if __name__ == "__main__":
    app.run(debug = True)