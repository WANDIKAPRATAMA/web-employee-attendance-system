import { FileTextIcon, PlusCircleIcon, SearchIcon } from "lucide-react";
interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  className?: string; // Additional custom classes for styling
  desc?: string; // Description text
  icon?: React.ReactNode;
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  children,
  className = "",
  desc = "",
  icon,
}) => {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      {/* Card Header */}
      <div className="px-6 py-5">
        <div className="flex items-center gap-3 flex-row">
          {icon && (
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              {icon}
            </div>
          )}
          <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
            {title}
          </h3>
        </div>
        {desc && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {desc}
          </p>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};
interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}

export function EmptyState({
  title = "No novels found",
  description = "There are currently no novels in review. Check back later or create a new one.",
  action,
  icon = <FileTextIcon className="w-12 h-12 text-gray-400" />,
}: EmptyStateProps) {
  return (
    <ComponentCard title={"Oops"} className="max-w-2xl mx-auto">
      <div className="text-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">{icon}</div>
        <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
        {action && <div className="mt-6">{action}</div>}
      </div>
    </ComponentCard>
  );
}

// Versi khusus untuk novel dalam review
export function EmptyNovelsInReview() {
  return (
    <EmptyState
      title="No novels in review"
      description="There are currently no novels under review. All caught up!"
      icon={<SearchIcon className="w-12 h-12 text-gray-400" />}
    />
  );
}

// Versi dengan tombol aksi
export function EmptyStateWithAction({
  actionText = "Create New Novel",
  onAction,
}: {
  actionText?: string;
  onAction?: () => void;
}) {
  return (
    <EmptyState
      title="No novels yet"
      description="Get started by creating your first novel."
      icon={<PlusCircleIcon className="w-12 h-12 text-gray-400" />}
      action={
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >
          {actionText}
        </button>
      }
    />
  );
}
