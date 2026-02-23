import { AlertBanner as AlertBannerType } from '../data/mockData';

interface Props {
  alert: AlertBannerType;
}

export default function AlertBanner({ alert }: Props) {
  const styles = {
    info: 'bg-blue-500/10 border-blue-500/30 text-blue-300',
    warning: 'bg-yellow-400/10 border-yellow-400/30 text-yellow-100',
    success: 'bg-green-500/10 border-green-500/30 text-green-300'
  }[alert.type];

  return (
    <div className={`${styles} border-y py-4 px-6`}>
      <div className="max-w-7xl mx-auto">
        <p className="font-semibold text-center md:text-left text-sm">
          ⚠️ {alert.message}
        </p>
        {alert.type === 'warning' && (
          <p className="text-xs text-center md:text-left mt-1 opacity-70">
            Próxima atividade
          </p>
        )}
      </div>
    </div>
  );
}
