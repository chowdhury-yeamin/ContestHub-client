import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useContest, useUpdateContest } from '../../../hooks/useContests';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';

const EditContest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: contest, isLoading } = useContest(id);
  const updateMutation = useUpdateContest();
  const [deadline, setDeadline] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  useEffect(() => {
    if (contest) {
      reset({
        name: contest.name,
        image: contest.image,
        description: contest.description,
        taskInstruction: contest.taskInstruction,
        price: contest.price,
        prizeMoney: contest.prizeMoney,
        contestType: contest.contestType,
      });
      setDeadline(new Date(contest.deadline));
    }
  }, [contest, reset]);

  const contestTypes = [
    'Image Design',
    'Article Writing',
    'Business Ideas',
    'Gaming Reviews',
    'Video Content',
    'Photography',
    'Other'
  ];

  const onSubmit = async (data) => {
    if (!deadline) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please select a deadline',
      });
      return;
    }

    try {
      const contestData = {
        ...data,
        deadline: deadline.toISOString(),
        price: parseFloat(data.price),
        prizeMoney: parseFloat(data.prizeMoney),
      };

      await updateMutation.mutateAsync({ id, data: contestData });
      
      Swal.fire({
        icon: 'success',
        title: 'Contest Updated!',
        text: 'Your contest has been updated successfully',
      });
      
      navigate('/dashboard/my-contests');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'Failed to update contest. Please try again.',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!contest) {
    return (
      <div className="text-center py-12">
        <p className="text-xl">Contest not found</p>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title mb-6">Edit Contest</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Contest Name *</span>
            </label>
            <input
              {...register('name', { required: 'Contest name is required' })}
              type="text"
              className="input input-bordered w-full"
            />
            {errors.name && (
              <p className="text-error text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="label">
              <span className="label-text">Contest Image URL *</span>
            </label>
            <input
              {...register('image', { required: 'Image URL is required' })}
              type="url"
              className="input input-bordered w-full"
            />
            {errors.image && (
              <p className="text-error text-sm mt-1">{errors.image.message}</p>
            )}
          </div>

          <div>
            <label className="label">
              <span className="label-text">Description *</span>
            </label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              className="textarea textarea-bordered w-full"
              rows={4}
            />
            {errors.description && (
              <p className="text-error text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="label">
              <span className="label-text">Task Instructions *</span>
            </label>
            <textarea
              {...register('taskInstruction', { required: 'Task instructions are required' })}
              className="textarea textarea-bordered w-full"
              rows={4}
            />
            {errors.taskInstruction && (
              <p className="text-error text-sm mt-1">{errors.taskInstruction.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">
                <span className="label-text">Entry Fee ($) *</span>
              </label>
              <input
                {...register('price', {
                  required: 'Entry fee is required',
                  min: { value: 0, message: 'Entry fee must be positive' },
                })}
                type="number"
                step="0.01"
                className="input input-bordered w-full"
              />
              {errors.price && (
                <p className="text-error text-sm mt-1">{errors.price.message}</p>
              )}
            </div>

            <div>
              <label className="label">
                <span className="label-text">Prize Money ($) *</span>
              </label>
              <input
                {...register('prizeMoney', {
                  required: 'Prize money is required',
                  min: { value: 0, message: 'Prize money must be positive' },
                })}
                type="number"
                step="0.01"
                className="input input-bordered w-full"
              />
              {errors.prizeMoney && (
                <p className="text-error text-sm mt-1">{errors.prizeMoney.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">
                <span className="label-text">Contest Type *</span>
              </label>
              <select
                {...register('contestType', { required: 'Contest type is required' })}
                className="select select-bordered w-full"
              >
                {contestTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.contestType && (
                <p className="text-error text-sm mt-1">{errors.contestType.message}</p>
              )}
            </div>

            <div>
              <label className="label">
                <span className="label-text">Deadline *</span>
              </label>
              <DatePicker
                selected={deadline}
                onChange={(date) => {
                  setDeadline(date);
                  setValue('deadline', date?.toISOString());
                }}
                minDate={new Date()}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div className="card-actions justify-end mt-6">
            <button
              type="button"
              onClick={() => navigate('/dashboard/my-contests')}
              className="btn btn-ghost"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="bg-accent-custom hover:bg-accent-custom/90 text-white border-0 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              {updateMutation.isPending ? (
                <span className="loading loading-spinner"></span>
              ) : (
                'Update Contest'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditContest;

