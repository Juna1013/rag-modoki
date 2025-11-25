import React, { useState } from 'react';
import NavigationBar from '../layout/NavigationBar';
import Footer from '../layout/Footer';
import { baseStyles } from '../../styles/sharedStyles';
import membersData from '../../data/members/members.json';

interface MemberIntroProps {
    onBackToDashboard: () => void;
    onNavigateToRagBot: () => void;
    onNavigateToContent: (type: string) => void;
}

interface Member {
    id: string;
    name: string;
    year: string;
    major: string;
    role: string;
    comment: string;
    avatar: string;
}

const MemberIntro: React.FC<MemberIntroProps> = ({
    onBackToDashboard,
    onNavigateToRagBot,
    onNavigateToContent
}) => {
    const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

    const handleImageError = (memberId: string) => {
        setImageErrors(prev => ({ ...prev, [memberId]: true }));
    };

    const getColorByIndex = (index: number) => {
        const colors = [
            'from-blue-400 to-blue-600',
            'from-purple-400 to-purple-600',
            'from-pink-400 to-pink-600',
            'from-green-400 to-green-600',
            'from-orange-400 to-orange-600',
            'from-teal-400 to-teal-600',
            'from-red-400 to-red-600',
            'from-indigo-400 to-indigo-600'
        ];
        return colors[index % colors.length];
    };

    return (
        <div className={baseStyles.appBackground}>
            {/* Navigation */}
            <div className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center pt-4 px-4 gap-3">
                <div className="flex-grow flex justify-center">
                    <NavigationBar
                        currentView="other"
                        onNavigateToRagBot={onNavigateToRagBot}
                        onNavigateToContent={onNavigateToContent}
                        onNavigateToHome={onBackToDashboard}
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100">
                <div className={baseStyles.pageContainer}>
                    <div className={baseStyles.contentContainer}>
                        <div className="flex flex-col gap-12 max-w-6xl mx-auto py-24 px-4">

                            {/* Header */}
                            <div className="text-center space-y-4 mb-8">
                                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                    Meet the Team
                                </h1>
                                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                                    Toon Appの開発を支えるメンバーを紹介します。
                                    <br />
                                    それぞれの専門性を活かし、最高の学習体験を提供します。
                                </p>
                            </div>

                            {/* Members Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {membersData.members.map((member: Member, index) => {
                                    const color = getColorByIndex(index);
                                    const hasError = imageErrors[member.id];

                                    return (
                                        <div
                                            key={member.id}
                                            className={`group bg-white hover:bg-gradient-to-br ${color.replace('from-', 'hover:from-').replace('to-', 'hover:to-').replace('-400', '-50').replace('-600', '-50')} rounded-[2rem] p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden relative`}
                                        >
                                            <div className="relative z-10 flex gap-5">
                                                {/* Large Avatar on Left */}
                                                <div className="flex-shrink-0">
                                                    <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br ${color} flex items-center justify-center shadow-lg overflow-hidden group-hover:scale-105 transition-transform duration-300`}>
                                                        {!hasError ? (
                                                            <img
                                                                src={member.avatar}
                                                                alt={member.name}
                                                                className="w-full h-full object-cover"
                                                                onError={() => handleImageError(member.id)}
                                                            />
                                                        ) : (
                                                            <span className="text-5xl">👤</span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Info on Right - Bullet Points */}
                                                <div className="flex-1 min-w-0 space-y-3">
                                                    {/* Name */}
                                                    <div>
                                                        <h3 className={`text-xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent leading-tight`}>
                                                            {member.name}
                                                        </h3>
                                                    </div>

                                                    {/* Info List */}
                                                    <ul className="space-y-2 text-sm">
                                                        <li className="flex items-start gap-2">
                                                            <span className="text-gray-400 mt-0.5">•</span>
                                                            <div>
                                                                <span className="text-gray-500 text-xs">学年: </span>
                                                                <span className="text-gray-700 font-medium">{member.year}</span>
                                                            </div>
                                                        </li>
                                                        <li className="flex items-start gap-2">
                                                            <span className="text-gray-400 mt-0.5">•</span>
                                                            <div>
                                                                <span className="text-gray-500 text-xs">専攻: </span>
                                                                <span className="text-gray-700 font-medium">{member.major}</span>
                                                            </div>
                                                        </li>
                                                        <li className="flex items-start gap-2">
                                                            <span className="text-gray-400 mt-0.5">•</span>
                                                            <div>
                                                                <span className="text-gray-500 text-xs">担当: </span>
                                                                <span className="text-gray-700 font-medium">{member.role}</span>
                                                            </div>
                                                        </li>
                                                        <li className="flex items-start gap-2">
                                                            <span className="text-gray-400 mt-0.5">•</span>
                                                            <div>
                                                                <span className="text-gray-500 text-xs">ひとこと: </span>
                                                                <span className="text-gray-700 font-medium">{member.comment}</span>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MemberIntro;
