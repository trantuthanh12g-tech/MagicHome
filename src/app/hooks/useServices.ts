import { initialServices } from '../data/initialServices';
import { Service } from '../types/service';

// Dữ liệu tĩnh — chỉnh sửa tại /media/editimgweb/services.ts
export function useServices() {
  const services: Service[] = initialServices as Service[];

  const getServiceById = (id: string): Service | undefined => {
    return services.find((service) => service.id === id);
  };

  return { services, getServiceById };
}
