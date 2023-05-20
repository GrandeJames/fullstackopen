const Course = ({ course }) => (
  <>
    <Header course={course}></Header>
    <Content course={course}></Content>
    <Total course={course}></Total>
  </>
);

const Header = ({ course }) => <h2>{course.name}</h2>;

const Content = ({ course }) => (
  <div>
    {course.parts.map((part) => (
      <Part key={part.id} name={part.name} exercises={part.exercises}></Part>
    ))}
  </div>
);

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Total = ({ course }) => {
  const exercises = course.parts.map((part) => part.exercises);
  const total = exercises.reduce(
    (accumulatedValue, currentValue) => accumulatedValue + currentValue,
    0
  );
  return <p style={{ fontWeight: "bold" }}>total of {total} exercises</p>;
};

export default Course;
