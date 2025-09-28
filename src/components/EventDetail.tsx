import { useParams } from "react-router-dom";

function EventDetail() {
  const { id } = useParams();

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold">Chi tiết sự kiện</h1>
      <p>ID sự kiện: {id}</p>
    </div>
  );
}

export default EventDetail;
