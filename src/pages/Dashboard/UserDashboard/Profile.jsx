import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUserProfile, useUpdateProfile } from "../../../hooks/useUsers";
import { useAuth } from "../../../contexts/AuthContext";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import Swal from "sweetalert2";

const Profile = () => {
  const { user } = useAuth();
  const { data: profile, isLoading } = useUserProfile();
  const updateMutation = useUpdateProfile();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: profile || {},
  });

  // Update form when profile loads
  useEffect(() => {
    if (profile) {
      reset(profile);
    }
  }, [profile, reset]);

  const onSubmit = async (data) => {
    try {
      await updateMutation.mutateAsync(data);
    } catch (error) {
      // Error handled by mutation
    }
  };

  // Chart data
  const chartData = profile
    ? [
        { name: "Won", value: profile.wonCount || 0, color: "#10b981" },
        {
          name: "Participated",
          value: (profile.participatedCount || 0) - (profile.wonCount || 0),
          color: "#3b82f6",
        },
      ]
    : [];

  const winPercentage = profile
    ? profile.participatedCount > 0
      ? (((profile.wonCount || 0) / profile.participatedCount) * 100).toFixed(1)
      : 0
    : 0;

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Stats */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-6">My Profile</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Win Percentage Chart */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Win Percentage</h3>
              {profile && profile.participatedCount > 0 ? (
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center py-8 text-muted">
                  <p>No participation data yet</p>
                </div>
              )}
              {/* Primary color for stats */}
              <div className="text-center mt-4">
                <p className="text-2xl font-bold text-primary-custom">
                  {winPercentage}%
                </p>
                <p className="text-sm text-muted">Win Rate</p>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-4">
              <div className="stat bg-base-200 rounded-lg">
                <div className="stat-title">Participated</div>
                <div className="stat-value text-primary-custom">
                  {profile?.participatedCount || 0}
                </div>
              </div>
              <div className="stat bg-base-200 rounded-lg">
                <div className="stat-title">Won</div>
                <div className="stat-value text-accent-custom">
                  {profile?.wonCount || 0}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Update Profile Form */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-6">Update Profile</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                className="input input-bordered w-full"
              />
              {errors.name && (
                <p className="text-error text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                {...register("photoURL")}
                type="url"
                className="input input-bordered w-full"
              />
              {errors.photoURL && (
                <p className="text-error text-sm mt-1">
                  {errors.photoURL.message}
                </p>
              )}
            </div>

            <div>
              <label className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                {...register("bio")}
                className="textarea textarea-bordered w-full"
                rows={4}
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Address</span>
              </label>
              <input
                {...register("address")}
                type="text"
                className="input input-bordered w-full"
              />
            </div>

            <div className="card-actions justify-end">
              <button
                type="submit"
                disabled={updateMutation.isPending}
                className="bg-accent-custom hover:bg-accent-custom/90 text-white border-0 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                {updateMutation.isPending ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Update Profile"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
