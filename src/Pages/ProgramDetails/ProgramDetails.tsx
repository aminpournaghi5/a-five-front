import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const ExerciseDetails = () => {
  const params = useParams<{ id: string }>();
  const [program, setProgram] = useState(null);

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/exerciselist/get/${params.id}`
        );
        setProgram(response.data.exercise);
        console.log(response.data.exercise);
        



        
      } catch (error) {
        console.error("خطا در دریافت اطلاعات تمرین:", error);
      } finally {
      }
    };

    fetchExercise();
  }, [params.id]); // اضافه کردن id به آرایه وابستگی‌ها

  return (
    <div>
      <h1>جزئیات تمرین</h1>
      {program ? (
        <>
          <p>عنوان: {program.title}</p>
          <p>توضیحات: {program.description}</p>
          
        </>
      ) : (
        <p>تمرینی یافت نشد</p>
      )}
    </div>
  );
};

export default ExerciseDetails;
