"use client";

import { motion } from "@/compat/motion";
import { useDonation } from "@/providers/DonationProvider";
import { IconMoney, IconMaterials, IconHeart, IconGlobe, IconFurniture, IconElectronics } from "@/constants/apoyanos-icons";

const categories = [
  { id: 'monetary', title: 'Donaciones Monetarias', description: 'Tu aporte ayuda a comprar materiales y pagar mano de obra', icon: IconMoney, color: 'from-primary to-secondary', headerBg: 'bg-primary', btnColor: 'from-primary to-secondary', items: [{ name: '1 m² de piso', price: 85000 }, { name: 'Kit de materiales básicos', price: 500000 }, { name: 'Donación libre', price: 0 }] },
  { id: 'materials', title: 'Materiales de Construcción', description: 'Done materiales directamente', icon: IconMaterials, color: 'from-secondary to-primary', headerBg: 'bg-secondary', btnColor: 'from-secondary to-primary', items: [{ name: 'Bulto de cemento', price: 65000 }, { name: 'Ladrillo (100 und)', price: 180000 }, { name: 'Pintura (galón)', price: 95000 }] },
  { id: 'equipment', title: 'Equipos Electrónicos', description: 'Televisores, computadores, equipos', icon: IconElectronics, color: 'from-primary to-accent', headerBg: 'bg-primary', btnColor: 'from-primary to-accent', items: [{ name: 'Televisor 55"', price: 1200000 }, { name: 'Computador', price: 1500000 }, { name: 'Proyector', price: 1500000 }] },
  { id: 'furniture', title: 'Muebles y Equipamiento', description: 'Sillas, mesas, camas, armarios', icon: IconFurniture, color: 'from-accent to-yellow-400', headerBg: 'bg-accent', btnColor: 'from-accent to-yellow-400', items: [{ name: 'Silla ergonómica', price: 280000 }, { name: 'Escritorio', price: 650000 }, { name: 'Cama articulada', price: 3500000 }] }
];

export default function DonationCatalog() {
  const { openDonationWidget } = useDonation();

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">¿Cómo Puedes Ayudar?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Elige cómo contribuir. Aceptamos donaciones monetarias, materiales, equipos y muebles.</p>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-yellow-400 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <motion.div 
                key={category.id} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`bg-gradient-to-r ${category.color} p-6 text-white relative overflow-hidden`}>
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
                  <IconComponent className="w-8 h-8 mb-3 relative z-10 text-white" />
                  <h3 className="font-bold text-xl relative z-10">{category.title}</h3>
                </div>
                <div className="p-4 border-b border-gray-100">
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
                <div className="p-4 space-y-2">
                  {category.items.slice(0, 3).map((item, i) => (
                    <button 
                      key={i} 
                      onClick={() => openDonationWidget()} 
                      className="w-full flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 text-sm transition-colors"
                    >
                      <span className="text-gray-700">{item.name}</span>
                      <span className="font-bold text-primary">${item.price.toLocaleString('es-CO')}</span>
                    </button>
                  ))}
                </div>
                <div className="p-4 pt-0">
                  <button 
                    onClick={() => openDonationWidget()} 
                    className={`w-full py-3 bg-gradient-to-r ${category.btnColor} ${category.id === 'furniture' ? 'text-primary' : 'text-white'} rounded-xl font-medium text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2`}
                  >
                    <IconHeart className="w-4 h-4" />
                    Ver más
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary via-secondary to-primary rounded-3xl p-10 md:p-14 text-white text-center relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
          <div className="relative z-10">
            <IconGlobe className="text-accent w-12 h-12 mx-auto mb-6" />
            <h3 className="text-2xl md:text-3xl font-bold mb-4">¿Estás fuera de Colombia?</h3>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">Aceptamos donaciones internacionales. Contamos con cuentas bancarias internacionales.</p>
            <button 
              onClick={() => openDonationWidget()} 
              className="px-8 py-4 bg-gradient-to-r from-accent to-yellow-400 text-primary rounded-full font-bold hover:shadow-lg hover:scale-105 transition-all"
            >
              Donar desde el Exterior
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
