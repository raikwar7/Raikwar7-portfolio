from flask import Flask, render_template, request, redirect, url_for
import pymysql

app = Flask(__name__)

def get_db():
    return pymysql.connect(
        host="localhost",
        user="root",
        password="Raikwar7",
        database="portfolio",
        cursorclass=pymysql.cursors.DictCursor
    )

# ---------------- FETCH PROJECTS ----------------
@app.route("/")
def projects():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM projects ORDER BY created_at DESC")
    projects = cursor.fetchall()
    conn.close()

    return render_template("index.html", projects=projects)

# ---------------- ADD PROJECT ----------------
@app.route("/add-project", methods=["POST"])
def add_project():
    title = request.form["title"]
    description = request.form["description"]
    tech_stack = request.form["tech_stack"]
    github_link = request.form["github_link"]

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO projects (title, description, tech_stack, github_link)
        VALUES (%s, %s, %s, %s)
    """, (title, description, tech_stack, github_link))
    conn.commit()
    conn.close()

    return redirect(url_for("projects"))

# ---------------- DELETE PROJECT ----------------
@app.route("/delete-project/<int:id>")
def delete_project(id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM projects WHERE id=%s", (id,))
    conn.commit()
    conn.close()

    return redirect(url_for("projects"))

if __name__ == "__main__":
    app.run(debug=True)
