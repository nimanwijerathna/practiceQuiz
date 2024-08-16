document.getElementById('theme-toggle').addEventListener('change', function() {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
});

document.body.classList.add('dark-mode');

const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');

const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const finalScoreElement = document.getElementById('final-score');
const scoreContainer = document.getElementById('score-container');

let currentQuestionIndex;
let quizScore = 0;

startButton.addEventListener('click', startQuiz);

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startQuiz() {
    startButton.classList.add('hide');
    currentQuestionIndex = 0;
    quizScore = 0;
    finalScoreElement.classList.add('hide');
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    questionElement.classList.add('question-text');

    question.answers.forEach((answer) => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn', 'answer-button');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";

    setStatusClass(selectedButton, correct);

    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === "true");
    });

    if (correct) {
        quizScore++;
    }

    if (questions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide");
    } else {
        startButton.innerText = "Restart";
        startButton.classList.remove("hide");
        showFinalScore();
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function showFinalScore() {
    questionContainerElement.classList.add('hide');

    finalScoreElement.innerText = `You scored ${quizScore} out of ${questions.length}!`;
    finalScoreElement.classList.remove('hide');

    scoreContainer.classList.remove('hide');

    if (document.getElementById('right-answers')) {
        document.getElementById('right-answers').innerText = '';
    }
}

//questions
const questions = [

    {
        question: 'Question: 1. Which class must a Java servlet extend to handle HTTP requests?',
        answers: [
            { text: 'HttpSession', correct: false },
            { text: 'HttpRequestHandler', correct: false },
            { text: 'HttpServlet', correct: true },
            { text: 'ServletRequest', correct: false },
        ],
    },
    {
        question: 'Question: 2. What method is used to initialize a servlet?',
        answers: [
            { text: 'start()', correct: false },
            { text: 'service()', correct: false },
            { text: 'setup()', correct: false },
            { text: 'init()', correct: true },
        ],
    },
    {
        question: 'Question: 3. Which of the following package contains servlet classes?',
        answers: [
            { text: 'javax.servlet', correct: false },
            { text: 'javax.servlet.http', correct: false },
            { text: 'Both of the above', correct: true },
            { text: 'None of the above', correct: false },
        ],
    },
    {
        question: 'Question: 4. Which method is used to get the parameter value from the request object?',
        answers: [
            { text: 'getParameterValue()', correct: false },
            { text: 'getParameter()', correct: true },
            { text: 'getValue()', correct: false },
            { text: 'requestParameter()', correct: false },
        ],
    },
    {
        question: 'Question: 5. Which file is used to configure servlet mappings in a Java web application?',
        answers: [
            { text: 'servlet-config.xml', correct: false },
            { text: 'Context.xml', correct: false },
            { text: 'web.xml', correct: true },
            { text: 'Application.properties', correct: false },
        ],
    },
    {
        question: 'Question: 6. What is the purpose of a JSP implicit object "out"?',
        answers: [
            { text: 'To handle HTTP requests', correct: false },
            { text: 'To represent the current JSP page', correct: false },
            { text: 'To provide access to the response writer', correct: true },
            { text: 'To manage session attributes', correct: false },
        ],
    },
    {
        question: 'Question: 7. What is the purpose of URL rewriting in servlets?',
        answers: [
            { text: 'To handle HTTP methods', correct: false },
            { text: 'To encode URLs in HTML', correct: false },
            { text: 'To manage session tracking without cookies', correct: true },
            { text: 'To define custom request headers', correct: false },
        ],
    },
    {
        question: 'Question: 8. What is the name of <%= %>?',
        answers: [
            { text: 'Expression', correct: true },
            { text: 'Page Directive', correct: false },
            { text: 'Scriptlet', correct: false },
            { text: 'Declaration', correct: false },
        ],
    },
    {
        question: 'Question: 9. Which method is used to destroy a session?',
        answers: [
            { text: 'invalidateSession()', correct: false },
            { text: 'invalidate()', correct: true },
            { text: 'deleteSession()', false: false },
            { text: 'delete()', correct: false },
        ],
    },
    {
        question: 'Question: 10. What is the purpose of session tracking in a web application?',
        answers: [
            { text: 'To manage servlet lifecycle', correct: false },
            { text: 'To monitor HTTP requests', correct: false },
            { text: 'To track user sessions across multiple requests', correct: true },
            { text: 'To define custom JSP tags', correct: false },
        ],
    },
    {
        question: 'Question: 11. Which method of ServletContextListener is invoked when an Application is initialized?',
        answers: [
            { text: 'contextInitialized()', correct: true },
            { text: 'initialized()', correct: false },
            { text: 'applicationInitialized()', correct: false },
            { text: 'servletInitialized()', correct: false },
        ],
    },
    {
        question: 'Question: 12. Which JSP directive is used to declare global variables and methods in a JSP page?',
        answers: [
            { text: '<%@include %>', correct: false },
            { text: '<%! %>', correct: true },
            { text: '<%= %>', correct: false },
            { text: '<%@taglib %>', correct: false },
        ],
    },
    {
        question: 'Question: 13. Which object allows JSPS to interact with the servlet contexts?',
        answers: [
            { text: 'request', correct: false },
            { text: 'session', correct: false },
            { text: 'response', correct: false },
            { text: 'application', correct: true },
        ],
    },
    {
        question: 'Question: 14. Which HTTP status code indicates that a resource is not found on the server?',
        answers: [
            { text: '200', correct: false },
            { text: '404', correct: true },
            { text: '500', correct: false },
            { text: '302', correct: false },
        ],
    },
    {
        question: 'Question: 15. What is the default session timeout of HTTP Session in minutes?',
        answers: [
            { text: '30', correct: true },
            { text: '60', correct: false },
            { text: '25', correct: false },
            { text: '1800', correct: false },
        ],
    },
    {
        question: 'Question: 16. Which method is called to remove an attribute from a session?',
        answers: [
            { text: 'session.removeAttribute()', correct: true },
            { text: 'session.invalidate()', correct: false },
            { text: 'session.destroy()', correct: false },
            { text: 'session.remove()', correct: false },
        ],
    },
    {
        question: 'Question: 17. What is the purpose of the jsplnit() method in the JSP lifecycle?',
        answers: [
            { text: 'To handle HTTP GET requests sent to the JSP!', correct: false },
            { text: 'To initialize the JSP page and allocate resources', correct: true },
            { text: 'To clean up resources and finalize the JSP page', correct: false },
            { text: 'To destroy the JSP page and release allocated memory', correct: false },
        ],
    },
    {
        question: 'Question: 18. Which implicit object of JSP is equivalent to this variable of Java programming language?',
        answers: [
            { text: 'page', correct: true },
            { text: 'pageContext', correct: false },
            { text: 'config', correct: false },
            { text: 'application', correct: false },
        ],
    },
    {
        question: 'Question: 19. What is the purpose of the @WebServlet annotation in a servlet class?',
        answers: [
            { text: 'To define servlet mappings', correct: true },
            { text: 'To specify initialization parameters', correct: false },
            { text: 'To manage session attributes', correct: false },
            { text: 'To configure HTTP methods', correct: false },
        ],
    },
    {
        question: 'Question 20. Which XML element is used to configure session related configurations in web.xml',
        answers: [
            { text: '<servlet>', correct: false },
            { text: '<servlet-mapping>', correct: false },
            { text: '<session-config>', correct: true },
            { text: '<web-app>', correct: false },
        ],
    },
    {
        question: 'Question 21. What is the purpose of web container?',
        answers: [
            { text: 'To execute JSP pages', correct: false },
            { text: 'To manage servelet lifecycle', correct: true },
            { text: 'To serve static HTML pages', correct: false },
            { text: 'To execute JavaScript code', correct: false },
        ],
    },
    {
        question: 'Question 22. What is the default HTTP method used when submitting a HTML form?',
        answers: [
            { text: 'GET', correct: true },
            { text: 'POST', correct: false },
            { text: 'PUT', correct: false },
            { text: 'DELETE', correct: false },
        ],
    },
    {
        question: `Question 23. What is the output of the following code? 
                                <html>
                                <head></head>
                                <body>
                                <% String out; %>
                                <% out = "ABC"; %>
                                The value is <%= out %>
                                </body>
                                </html>`,
        answers: [
            { text: 'The value is out', correct: false },
            { text: 'Page wont compile', correct: true },
            { text: 'The value is ABC', correct: false },
            { text: 'ABC', correct: false },
        ],
    },
    {
        question: 'Question 24. Which of the following statements is true regarding the include() method in the RequestDispatcher interface?',
        answers: [
            { text: 'It includes the response of another servlet or JSP within the current response', correct: true },
            { text: 'It sends the request to a different servlet or JSP within the same web application', correct: false },
            { text: 'It sends the request to a different web application', correct: false },
            { text: 'It terminates the servlet execution', correct: false },
        ],
    },
    {
        question: 'Question 25. Which method of HttpSessionListener gives notification when a session is created?',
        answers: [
            { text: 'sessionCreated()', correct: true },
            { text: 'sessionStarted()', correct: false },
            { text: 'is New()', correct: false },
            { text: 'It terminates the servlet execution', correct: false },
        ],
    },
    {
        question: 'Question 26. Which method is used to retrieve initialization parameters from a ServletConfig object?',
        answers: [
            { text: 'getParameters()', correct: false },
            { text: 'getServletConfig()', correct: false },
            { text: 'getServletContext()', correct: false },
            { text: 'getInitParameter()', correct: true },
        ],
    },
    {
        question: 'Question 27. What is the purpose of a servlet context parameter in a web application?',
        answers: [
            { text: 'To define session attributes', correct: false },
            { text: 'To configure global settings accessible to all servlets', correct: true },
            { text: 'To manage servlet mappings', correct: false },
            { text: 'To specify JSP directives', correct: false },
        ],
    },
    {
        question: 'Question 28. Never end an expression with a semicolon inside an Expression tag?',
        answers: [
            { text: 'True', correct: true },
            { text: 'False', correct: false },
        ],
    },
    {
        question: 'Question 29. Which of the following is a correct way of URL Rewriting?',
        answers: [
            { text: 'http://localhost:8080/wcd/profile.jsp+JAVASESSIONID=123', correct: false },
            { text: 'http://localhost:8080/wcd/profile.jsp?JSESSIONID=123', correct: false },
            { text: 'http://localhost:8080/wcd/profile.jsp%PHPSESSID=123', correct: false },
            { text: 'http://localhost:8080/wcd/profile.jsp;JSESSIONID=123', correct: true },
        ],
    },
    {
        question: 'Question 30. Which method is used to access the cookies that are added to the response object?',
        answers: [
            { text: 'getCookies()', correct: true },
            { text: 'getNewCookies();', correct: false },
            { text: 'cookies();', correct: false },
            { text: 'returnCookies():', correct: false },
        ],
    },
    {
        question: 'Question 31. <%! // this is a ............ %>?',
        answers: [
            { text: 'Declaration in a JSP Page', correct: true },
            { text: 'Scriptlet in a JSP Page', correct: false },
            { text: 'Expression in a JSP Page', correct: false },
            { text: 'None of above', correct: false },
        ],
    },
    {
        question: 'Question 32. What is the lifecycle of a servlet?',
        answers: [
            { text: 'Servlet class is loaded', correct: false },
            { text: 'Servlet instance is created', correct: false },
            { text: 'init, Service,destroy method is invoked', correct: false },
            { text: 'All mentioned above', correct: true },
        ],
    },
    {
        question: 'Question 33. Which method is used to send the same request and response objects to another servlet in RequestDispatcher?',
        answers: [
            { text: 'forward()', correct: true },
            { text: 'sendRedirect()', correct: false },
            { text: 'Both A & B', correct: false },
            { text: 'None of the above', correct: false },
        ],
    },
    {
        question: 'Question 34. The sendRedirect() method of HttpServletResponse interface can be used to redirect response to another resource, it may be a servlet, jsp or html file?',
        answers: [
            { text: 'True', correct: true },
            { text: 'False', correct: false },        
        ],
    },
    {
        question: 'Question 35. Which of the following code delete a cookie in servlet?',
        answers: [
            { text: 'response.deleteCookie(cookie);', correct: false },
            { text: 'cookie.setMaxAge(0);', correct: true },
            { text: 'request.deleteCookie(cookie);', correct: false },
            { text: 'None of the above', correct: false },
        ],
    },
    {
        question: 'Question 36. When the Web Container initializes a servlet, it creates a _______ servlet?',
        answers: [
            { text: 'ServletConfig', correct: true },
            { text: 'ServletInit', correct: false },
            { text: 'ServletContext', correct: false },
            { text: 'None of the above', correct: false },
        ],
    },
    {
        question: 'Question 37. _______ is responsible for managing execution of servlet ?',
        answers: [
            { text: 'Web Container', correct: true },
            { text: 'Servlet Context', correct: false },
            { text: 'JVM', correct: false },
            { text: 'Server', correct: false },
        ],
    },
    {
        question: 'Question 38. Which class provides implementation for service() method?',
        answers: [
            { text: 'GenericServlet', correct: false },
            { text: 'HttpServlet', correct: true },
            { text: 'Servlet', correct: false },
            { text: 'None of the above', correct: false },
        ],
    },
    {
        question: 'Question 39. Which method is called only once in the Servlet life cycle?',
        answers: [
            { text: 'service()', correct: false },
            { text: 'init()', correct: true },
            { text: 'initialize', correct: false },
            { text: 'All of the above', correct: false },
        ],
    },
    {
        question: 'Question 40. Which method define in the HttpServletResponse may be used to set the content?',
        answers: [
            { text: 'setType()', correct: false },
            { text: 'setContent()', correct: false },
            { text: 'setContentType()', correct: true },
            { text: 'None of the above', correct: false },
        ],
    },
];

