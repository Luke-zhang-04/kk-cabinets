from flask import Flask, render_template


application = Flask(__name__)

@application.route('/about')
def about():
    return render_template('about.html')


@application.route('/contact')
def contact():
    return render_template('contact.html')


@application.route('/countertops')
def countertops():
    return render_template('countertops.html')


@application.route('/gallery')
def gallery():
    return render_template("gallery.html")

@application.route('/')
def index():
    return render_template('index.html')


@application.route('/login')
def renderLogoin():
    return render_template("login.html")


@application.route('/recommendations')
def routeRecommendations():
    return render_template('recommendations.html')


@application.route('/testimonials')
def testimonials():
    return render_template('testimonials.html')


@application.errorhandler(404)
def page_not_found():
    # note that we set the 404 status explicitly
    return render_template('404.html'), 404


if __name__ == "__main__":
    application.run(debug = True)