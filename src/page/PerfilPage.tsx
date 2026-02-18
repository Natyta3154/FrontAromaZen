import { usePerfil } from '../hooks/usePerfil';
import { User, ShieldCheck, Edit3, Save, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const PerfilPage = () => {
    const { formData, isEditing, loading, handleInputChange, saveProfile, toggleEdit } = usePerfil();

    const onSave = async () => {
        const result = await saveProfile();
        if (result.success) toast.success("Perfil actualizado");
        else toast.error("Error al guardar cambios");
    };

    return (
        <div className="min-h-screen bg-[#fdfbf7] py-12 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-[3rem] p-10 shadow-sm border border-stone-100">
                <div className="flex flex-col md:flex-row items-center gap-10">

                    <div className="w-32 h-32 bg-stone-50 rounded-full flex items-center justify-center border-2 border-stone-100 relative">
                        <User size={64} className="text-stone-300" />
                        {formData.username === 'admin' && <ShieldCheck className="absolute bottom-0 right-0 text-amber-500 bg-white rounded-full" />}
                    </div>

                    <div className="flex-grow space-y-6 w-full">
                        <h1 className="text-3xl font-serif font-light text-stone-800">Mi Perfil</h1>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Nombre */}
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-stone-400 uppercase tracking-tighter">Nombre</label>
                                {isEditing ? (
                                    <input
                                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl outline-none focus:ring-2 focus:ring-stone-200"
                                        value={formData.first_name}
                                        onChange={(e) => handleInputChange('first_name', e.target.value)}
                                    />
                                ) : (
                                    <div className="px-4 py-3 bg-stone-50/50 rounded-2xl text-stone-700">{formData.first_name || '—'}</div>
                                )}
                            </div>

                            {/* Apellido */}
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-stone-400 uppercase tracking-tighter">Apellido</label>
                                {isEditing ? (
                                    <input
                                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl outline-none focus:ring-2 focus:ring-stone-200"
                                        value={formData.last_name}
                                        onChange={(e) => handleInputChange('last_name', e.target.value)}
                                    />
                                ) : (
                                    <div className="px-4 py-3 bg-stone-50/50 rounded-2xl text-stone-700">{formData.last_name || '—'}</div>
                                )}
                            </div>

                            {/* Email */}
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-stone-400 uppercase tracking-tighter">Email</label>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl outline-none focus:ring-2 focus:ring-stone-200"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                    />
                                ) : (
                                    <div className="px-4 py-3 bg-stone-50/50 rounded-2xl text-stone-700">{formData.email}</div>
                                )}
                            </div>

                            {/* Contraseña (Solo aparece al editar) */}
                            {isEditing && (
                                <div className="space-y-1 md:col-span-2">
                                    <label className="text-xs font-bold text-stone-400 uppercase tracking-tighter">
                                        Nueva Contraseña (dejar en blanco para no cambiar)
                                    </label>
                                    <input
                                        type="password"
                                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl outline-none focus:ring-2 focus:ring-stone-200"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={(e) => handleInputChange('password', e.target.value)}
                                    />
                                </div>
                            )}



                            {/* Usuario (Solo lectura) */}
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-stone-400 uppercase tracking-tighter">Nombre de Usuario</label>
                                <div className="px-4 py-3 bg-stone-100/50 rounded-2xl text-stone-400 italic">@{formData.username}</div>
                            </div>
                        </div>

                        <div className="pt-4 flex gap-4">
                            {isEditing ? (
                                <>
                                    <button onClick={onSave} disabled={loading} className="px-8 py-3 bg-stone-800 text-white rounded-full font-bold flex items-center gap-2 hover:bg-stone-700 transition-all">
                                        {loading ? <Loader2 className="animate-spin" /> : <Save size={18} />} Guardar
                                    </button>
                                    <button onClick={toggleEdit} className="px-8 py-3 bg-white border border-stone-200 text-stone-500 rounded-full font-bold">
                                        Cancelar
                                    </button>
                                </>
                            ) : (
                                <button onClick={toggleEdit} className="px-8 py-3 bg-stone-800 text-white rounded-full font-bold flex items-center gap-2 hover:bg-stone-700 transition-all">
                                    <Edit3 size={18} /> Editar Perfil
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PerfilPage;