"""
Diagnostic Question Bank for SkillPath AI Assessment Lab
Provides beginner-to-intermediate diagnostic questions for technical skills.
"""

QUESTION_BANK = {
    "Python": [
        {
            "id": "py-01",
            "skill": "Python",
            "question": "Which of the following data structures in Python is immutable?",
            "options": [
                {"id": "A", "text": "List"},
                {"id": "B", "text": "Tuple"},
                {"id": "C", "text": "Dictionary"},
                {"id": "D", "text": "Set"}
            ],
            "correct_option_id": "B",
            "explanation": "Tuples are immutable in Python, meaning their elements cannot be modified, added, or removed after creation.",
            "difficulty": "Beginner"
        },
        {
            "id": "py-02",
            "skill": "Python",
            "question": "What is the primary difference between `is` and `==` in Python?",
            "options": [
                {"id": "A", "text": "`==` checks for identity in memory, while `is` checks for value equality."},
                {"id": "B", "text": "`is` checks for identity in memory, while `==` checks for value equality."},
                {"id": "C", "text": "They are completely interchangeable in Python 3."},
                {"id": "D", "text": "`is` only works for integers."}
            ],
            "correct_option_id": "B",
            "explanation": "`is` compares whether two references point to the exact same memory address (identity), whereas `==` evaluates equality of value.",
            "difficulty": "Beginner"
        },
        {
            "id": "py-03",
            "skill": "Python",
            "question": "How do Python list comprehensions compare to traditional `for` loops with `.append()`?",
            "options": [
                {"id": "A", "text": "List comprehensions are generally faster and more concise because they run at C-level speed."},
                {"id": "B", "text": "Traditional loops use less memory under all circumstances."},
                {"id": "C", "text": "List comprehensions cannot include `if` conditional filtering."},
                {"id": "D", "text": "Comprehensions are deprecated in Python 3.9+."}
            ],
            "correct_option_id": "A",
            "explanation": "List comprehensions are evaluated in optimized bytecode and are more idiomatic and concise for creating transformed lists.",
            "difficulty": "Intermediate"
        },
        {
            "id": "py-04",
            "skill": "Python",
            "question": "What does the `yield` statement do in a Python function?",
            "options": [
                {"id": "A", "text": "Terminates the program immediately."},
                {"id": "B", "text": "Turns the function into a generator that lazily produces values one at a time."},
                {"id": "C", "text": "Imports external packages asynchronously."},
                {"id": "D", "text": "Locks the thread for concurrency."}
            ],
            "correct_option_id": "B",
            "explanation": "`yield` pauses the function state and yields a value back to the caller, producing an iterable generator without holding all items in memory.",
            "difficulty": "Intermediate"
        }
    ],
    "FastAPI": [
        {
            "id": "fa-01",
            "skill": "FastAPI",
            "question": "What underlying library does FastAPI use for data validation and serialization?",
            "options": [
                {"id": "A", "text": "Marshmallow"},
                {"id": "B", "text": "Pydantic"},
                {"id": "C", "text": "Django ORM"},
                {"id": "D", "text": "Celery"}
            ],
            "correct_option_id": "B",
            "explanation": "FastAPI is built tightly on top of Pydantic for data validation, typing, and automatic schema generation.",
            "difficulty": "Beginner"
        },
        {
            "id": "fa-02",
            "skill": "FastAPI",
            "question": "How does FastAPI achieve high concurrent performance for asynchronous endpoints?",
            "options": [
                {"id": "A", "text": "By using the ASGI standard and Starlette on top of asyncio."},
                {"id": "B", "text": "By spawning a new operating system process for each HTTP request."},
                {"id": "C", "text": "By compiling Python to C++ at runtime."},
                {"id": "D", "text": "By disabling SSL encryption."}
            ],
            "correct_option_id": "A",
            "explanation": "FastAPI runs on ASGI servers (such as Uvicorn) and uses Starlette's lightweight async core to handle non-blocking concurrent I/O.",
            "difficulty": "Intermediate"
        },
        {
            "id": "fa-03",
            "skill": "FastAPI",
            "question": "Where can you interactively explore and test FastAPI endpoints out-of-the-box?",
            "options": [
                {"id": "A", "text": "At `/docs` (Swagger UI) or `/redoc` (ReDoc)."},
                {"id": "B", "text": "Only through Postman Desktop Client."},
                {"id": "C", "text": "At `/admin` with superuser credentials."},
                {"id": "D", "text": "FastAPI does not generate documentation."}
            ],
            "correct_option_id": "A",
            "explanation": "FastAPI automatically serves interactive OpenAPI documentation at `/docs` (Swagger UI) and `/redoc`.",
            "difficulty": "Beginner"
        },
        {
            "id": "fa-04",
            "skill": "FastAPI",
            "question": "What is the purpose of `Depends()` in FastAPI route handlers?",
            "options": [
                {"id": "A", "text": "It implements Dependency Injection for shared resources like database sessions or auth checks."},
                {"id": "B", "text": "It pauses the execution until another endpoint finishes."},
                {"id": "C", "text": "It checks if the user has internet access."},
                {"id": "D", "text": "It restarts the server if an error occurs."}
            ],
            "correct_option_id": "A",
            "explanation": "`Depends` is FastAPI's powerful Dependency Injection system that injects database connections, security headers, or service classes cleanly.",
            "difficulty": "Intermediate"
        }
    ],
    "React": [
        {
            "id": "rc-01",
            "skill": "React",
            "question": "What is the primary function of the `useState` hook in React functional components?",
            "options": [
                {"id": "A", "text": "To manipulate the browser's URL directly."},
                {"id": "B", "text": "To add local, stateful variables that trigger re-rendering when updated."},
                {"id": "C", "text": "To fetch remote data from an API automatically on page load."},
                {"id": "D", "text": "To optimize CSS styling."}
            ],
            "correct_option_id": "B",
            "explanation": "`useState` declares a state variable and a setter function, causing the component to re-render with the new state when invoked.",
            "difficulty": "Beginner"
        },
        {
            "id": "rc-02",
            "skill": "React",
            "question": "When does the callback inside `useEffect(..., [])` with an empty dependency array execute?",
            "options": [
                {"id": "A", "text": "On every single re-render of the component."},
                {"id": "B", "text": "Only once after the initial mount of the component."},
                {"id": "C", "text": "Only when the parent component unmounts."},
                {"id": "D", "text": "Never, an empty array disables the effect."}
            ],
            "correct_option_id": "B",
            "explanation": "An empty dependency array `[]` tells React to run the effect only once after the component mounts into the DOM.",
            "difficulty": "Beginner"
        },
        {
            "id": "rc-03",
            "skill": "React",
            "question": "Why should keys provided to elements in a mapped list be unique and stable?",
            "options": [
                {"id": "A", "text": "To help React's reconciliation engine accurately identify which items have changed, moved, or deleted."},
                {"id": "B", "text": "Keys are required by CSS for flexbox layout."},
                {"id": "C", "text": "Without keys, the JavaScript engine throws a syntax error."},
                {"id": "D", "text": "Keys encrypt the DOM against cross-site scripting."}
            ],
            "correct_option_id": "A",
            "explanation": "Stable keys allow React to identify items efficiently during reconciliation, minimizing unnecessary DOM re-creation.",
            "difficulty": "Intermediate"
        },
        {
            "id": "rc-04",
            "skill": "React",
            "question": "What is 'prop drilling' in React, and how can it be mitigated?",
            "options": [
                {"id": "A", "text": "Passing props down through many intermediate components; mitigated by Context API or state stores."},
                {"id": "B", "text": "A bug where props are mutated directly inside child components."},
                {"id": "C", "text": "A technique to compile JSX into assembly code."},
                {"id": "D", "text": "Testing React components with unit tests."}
            ],
            "correct_option_id": "A",
            "explanation": "Prop drilling is passing data down multiple nested components. React Context or state management tools allow consuming state directly.",
            "difficulty": "Intermediate"
        }
    ],
    "Docker": [
        {
            "id": "dk-01",
            "skill": "Docker",
            "question": "What is the core conceptual difference between a Docker Image and a Docker Container?",
            "options": [
                {"id": "A", "text": "An image is a read-only blueprint, while a container is a runnable, isolated instance of that image."},
                {"id": "B", "text": "A container contains source code; an image is only used for databases."},
                {"id": "C", "text": "An image is hardware, a container is software."},
                {"id": "D", "text": "They are identical terms in modern cloud computing."}
            ],
            "correct_option_id": "A",
            "explanation": "An image is an immutable template containing dependencies and code. A container is a running process instance executing that image.",
            "difficulty": "Beginner"
        },
        {
            "id": "dk-02",
            "skill": "Docker",
            "question": "Which Dockerfile instruction specifies the executable that will run by default when the container starts?",
            "options": [
                {"id": "A", "text": "RUN"},
                {"id": "B", "text": "FROM"},
                {"id": "C", "text": "CMD or ENTRYPOINT"},
                {"id": "D", "text": "LABEL"}
            ],
            "correct_option_id": "C",
            "explanation": "`CMD` and `ENTRYPOINT` configure the default process and arguments executed when starting a container.",
            "difficulty": "Beginner"
        },
        {
            "id": "dk-03",
            "skill": "Docker",
            "question": "Why is multi-stage building in Docker beneficial for production?",
            "options": [
                {"id": "A", "text": "It drastically reduces final image size by discarding build tools and intermediate artifacts."},
                {"id": "B", "text": "It allows a container to run multiple operating systems concurrently."},
                {"id": "C", "text": "It bypasses container security permissions."},
                {"id": "D", "text": "It automatically generates unit tests."}
            ],
            "correct_option_id": "A",
            "explanation": "Multi-stage builds allow you to compile assets in a heavy build stage, then copy only the compiled binaries into a slim production runtime image.",
            "difficulty": "Intermediate"
        },
        {
            "id": "dk-04",
            "skill": "Docker",
            "question": "What does the `-p 8000:80` flag mean in `docker run -p 8000:80 myapp`?",
            "options": [
                {"id": "A", "text": "Forward host port 8000 to container port 80."},
                {"id": "B", "text": "Forward container port 8000 to host port 80."},
                {"id": "C", "text": "Allocate 8000MB of RAM and 80% CPU."},
                {"id": "D", "text": "Retry starting the container 8000 times."}
            ],
            "correct_option_id": "A",
            "explanation": "The `-p <host_port>:<container_port>` flag maps incoming traffic on the host machine's port 8000 into port 80 inside the container.",
            "difficulty": "Beginner"
        }
    ],
    "SQL": [
        {
            "id": "sql-01",
            "skill": "SQL",
            "question": "Which SQL clause is used to filter records resulting from an aggregate function like `COUNT()` or `AVG()`?",
            "options": [
                {"id": "A", "text": "WHERE"},
                {"id": "B", "text": "HAVING"},
                {"id": "C", "text": "GROUP BY"},
                {"id": "D", "text": "ORDER BY"}
            ],
            "correct_option_id": "B",
            "explanation": "`HAVING` filters aggregated rows after `GROUP BY`, whereas `WHERE` filters rows before aggregation occurs.",
            "difficulty": "Beginner"
        },
        {
            "id": "sql-02",
            "skill": "SQL",
            "question": "What is the difference between `INNER JOIN` and `LEFT JOIN`?",
            "options": [
                {"id": "A", "text": "`INNER JOIN` returns only matching rows from both tables; `LEFT JOIN` returns all rows from the left table plus matching rows."},
                {"id": "B", "text": "`LEFT JOIN` only works on primary keys."},
                {"id": "C", "text": "`INNER JOIN` is strictly faster than all other joins by definition."},
                {"id": "D", "text": "`LEFT JOIN` deletes unmatched rows from the right table."}
            ],
            "correct_option_id": "A",
            "explanation": "`INNER JOIN` produces records that have matches in both tables. `LEFT JOIN` preserves all rows from the left table, filling missing right-side attributes with `NULL`.",
            "difficulty": "Beginner"
        },
        {
            "id": "sql-03",
            "skill": "SQL",
            "question": "What database object is created to significantly accelerate query search speeds at the cost of slower write operations?",
            "options": [
                {"id": "A", "text": "Trigger"},
                {"id": "B", "text": "Index (e.g. B-tree)"},
                {"id": "C", "text": "Stored Procedure"},
                {"id": "D", "text": "View"}
            ],
            "correct_option_id": "B",
            "explanation": "An index builds a lookup data structure (typically a B-Tree) that speeds up search queries but adds overhead during INSERT/UPDATE operations.",
            "difficulty": "Intermediate"
        },
        {
            "id": "sql-04",
            "skill": "SQL",
            "question": "What does the ACID acronym stand for in relational database management systems?",
            "options": [
                {"id": "A", "text": "Atomicity, Consistency, Isolation, Durability"},
                {"id": "B", "text": "Asynchronous, Concurrent, Indexed, Distributed"},
                {"id": "C", "text": "Application, Cache, Interface, Data"},
                {"id": "D", "text": "Authorization, Connection, Integrity, Distribution"}
            ],
            "correct_option_id": "A",
            "explanation": "ACID guarantees that database transactions are processed reliably: Atomicity, Consistency, Isolation, and Durability.",
            "difficulty": "Intermediate"
        }
    ],
    "Git": [
        {
            "id": "git-01",
            "skill": "Git",
            "question": "What does `git pull` do under the hood?",
            "options": [
                {"id": "A", "text": "It executes `git fetch` followed by `git merge` (or `git rebase`)."},
                {"id": "B", "text": "It uploads local commits to the remote branch."},
                {"id": "C", "text": "It deletes untracked files."},
                {"id": "D", "text": "It initializes a brand new Git repository."}
            ],
            "correct_option_id": "A",
            "explanation": "`git pull` is shorthand for fetching remote changes into your tracking refs and merging them into your current local branch.",
            "difficulty": "Beginner"
        },
        {
            "id": "git-02",
            "skill": "Git",
            "question": "What command allows you to save uncommitted local changes temporarily without making a commit?",
            "options": [
                {"id": "A", "text": "git stash"},
                {"id": "B", "text": "git reset --hard"},
                {"id": "C", "text": "git checkout -b"},
                {"id": "D", "text": "git clean"}
            ],
            "correct_option_id": "A",
            "explanation": "`git stash` temporarily shelves changes you've made to your working copy so you can work on something else, and re-apply them later.",
            "difficulty": "Beginner"
        }
    ],
    "Machine Learning": [
        {
            "id": "ml-01",
            "skill": "Machine Learning",
            "question": "What problem occurs when a model performs exceptionally well on training data but poorly on unseen test data?",
            "options": [
                {"id": "A", "text": "Overfitting (high variance)"},
                {"id": "B", "text": "Underfitting (high bias)"},
                {"id": "C", "text": "Data leakage"},
                {"id": "D", "text": "Gradient explosion"}
            ],
            "correct_option_id": "A",
            "explanation": "Overfitting happens when a model learns the training noise rather than general patterns, resulting in poor generalization on unseen test data.",
            "difficulty": "Beginner"
        },
        {
            "id": "ml-02",
            "skill": "Machine Learning",
            "question": "Which metric is generally preferred over Accuracy when evaluating classification models on heavily imbalanced datasets?",
            "options": [
                {"id": "A", "text": "F1-Score or Precision/Recall (PR-AUC)"},
                {"id": "B", "text": "Mean Squared Error"},
                {"id": "C", "text": "R-squared"},
                {"id": "D", "text": "Perplexity"}
            ],
            "correct_option_id": "A",
            "explanation": "F1-Score balances Precision and Recall, which prevents misleading high accuracy scores when one class heavily dominates the dataset.",
            "difficulty": "Intermediate"
        }
    ]
}

def get_questions_for_skill(skill: str, limit: int = 4):
    """Retrieves up to limit diagnostic questions for a skill, or fallback questions if not directly matched."""
    # Normalize skill
    matched = None
    for k in QUESTION_BANK:
        if k.lower() == skill.lower():
            matched = QUESTION_BANK[k]
            break
            
    if not matched:
        # Fallback to general programming questions if specific skill not in bank
        matched = QUESTION_BANK["Python"]
        
    return matched[:limit]
